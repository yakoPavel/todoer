import { AxiosInstance } from "axios";
import { MutationFunction, useMutation } from "react-query";

import { generateTempId } from "./generateTempId";
import { insertNewItem } from "./insertNewItem";

import { Task, Label, Project } from "@/features/authorizedApp/types";
import { useClient } from "@/hooks/useClient";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { CreateLabelBody, CreateProjectBody, CreateTaskBody } from "@/types";
import { DistributiveOmit } from "@/types/utils";

type CreateItemBody = CreateLabelBody | CreateProjectBody | CreateTaskBody;

type ItemData = Task | Label | Project;

type GetNewItemForOptimisticUpdate<
  C extends CreateItemBody,
  I extends ItemData,
> = (data: C) => I;

type CreateMutationOptions<C extends CreateItemBody, I extends ItemData> = {
  /** A label for the data in react-query. */
  dataLabel: unknown[];
  /** An endpoint for the update. */
  endpoint: string;
  /**
   * A getter for the data that will be used as a new item for the
   * optimistic update.
   * */
  getNewItemForOptimisticUpdate: GetNewItemForOptimisticUpdate<C, I>;
};

type OptimisticallyUpdateDataParams<
  C extends CreateItemBody,
  I extends ItemData,
> = {
  createItemData: C;
  dataLabel: unknown[];
  getNewItemForOptimisticUpdate: GetNewItemForOptimisticUpdate<C, I>;
  prevData: I[] | undefined;
};

function optimisticallyUpdateData<
  C extends CreateItemBody,
  I extends ItemData,
>({
  createItemData,
  dataLabel,
  getNewItemForOptimisticUpdate,
  prevData,
}: OptimisticallyUpdateDataParams<C, I>) {
  const { direction, triggerId } = createItemData;

  const newItem = getNewItemForOptimisticUpdate(createItemData);

  const newData = insertNewItem({
    destination: prevData ?? [],
    itemToInsert: newItem,
    direction,
    triggerId,
  });

  queryClient.setQueryData<I[]>(dataLabel, newData);
  queryClient.setQueryData<I>([...dataLabel, createItemData.tempId], newItem);
}

export function generateCreateMutation<
  C extends CreateItemBody,
  I extends ItemData,
>({
  dataLabel,
  getNewItemForOptimisticUpdate,
  endpoint,
}: CreateMutationOptions<C, I>) {
  const createItem = async (
    instance: Promise<AxiosInstance>,
    data: C,
  ): Promise<I> => {
    const client = await instance;

    return (await client.post(endpoint, data)).data;
  };

  type CreateItemBodyWithoutTempId = DistributiveOmit<C, "tempId">;

  type UseCreateItemOptions = {
    config?: MutationConfig<(data: CreateItemBodyWithoutTempId) => Promise<I>>;
  };

  const useCreateItem = ({ config }: UseCreateItemOptions = {}) => {
    const awaitedClient = useClient();
    const tempId = generateTempId();

    const mutationFn = (data: CreateItemBodyWithoutTempId) =>
      createItem(awaitedClient, { ...data, tempId } as unknown as C);

    return useMutation({
      onMutate: async (newItemData) => {
        await queryClient.cancelQueries(dataLabel);

        const prevData = queryClient.getQueryData<I[]>(dataLabel);

        optimisticallyUpdateData({
          createItemData: { ...newItemData, tempId } as unknown as C,
          dataLabel,
          getNewItemForOptimisticUpdate,
          prevData,
        });

        return { prevData };
      },
      onError: (_, __, context: any) => {
        if (context && typeof context === "object" && "prevData" in context) {
          queryClient.setQueryData<I[]>(dataLabel, context.prevData);
          queryClient.removeQueries([...dataLabel, tempId]);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(dataLabel);
      },
      ...config,
      mutationFn: mutationFn as MutationFunction<
        Awaited<I>,
        CreateItemBodyWithoutTempId
      >,
    });
  };

  return {
    createItem,
    useCreateItem,
  };
}

export type UseCreateMutation = ReturnType<
  typeof generateCreateMutation
>["useCreateItem"];
