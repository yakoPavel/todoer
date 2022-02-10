import { AxiosInstance } from "axios";
import { MutationFunction, useMutation } from "react-query";

import { insertNewItem } from "./insertNewItem";

import { Task, Label, Project } from "@/features/authorizedApp/types";
import { useClient } from "@/hooks/useClient";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { CreateLabelBody, CreateProjectBody, CreateTaskBody } from "@/types";

type CreateItemBody = CreateLabelBody | CreateProjectBody | CreateTaskBody;

type ItemData = Task | Label | Project;

type GetNewItemForOptimisticUpdate<
  C extends CreateItemBody,
  I extends ItemData,
> = (data: C) => I;

type CreateMutationOptions<C extends CreateItemBody, I extends ItemData> = {
  /** A label for the data in react-query. */
  dataLabel: string;
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
  dataLabel: string;
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
  queryClient.setQueryData<I>([dataLabel, createItemData.tempId], newItem);
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

  type UseCreateItemOptions = {
    config?: MutationConfig<(data: C) => Promise<I>>;
  };

  const useCreateItem = ({ config }: UseCreateItemOptions = {}) => {
    const awaitedClient = useClient();

    return useMutation({
      onMutate: async (newItemData) => {
        await queryClient.cancelQueries(dataLabel);

        const prevData = queryClient.getQueryData<I[]>(dataLabel);

        optimisticallyUpdateData({
          createItemData: newItemData,
          dataLabel,
          getNewItemForOptimisticUpdate,
          prevData,
        });

        return { prevData };
      },
      onError: (_, newItemData, context: any) => {
        if (context && typeof context === "object" && "prevData" in context) {
          queryClient.setQueryData<I[]>(dataLabel, context.prevData);
          queryClient.removeQueries([dataLabel, newItemData.tempId]);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(dataLabel);
      },
      ...config,
      mutationFn: createItem.bind(null, awaitedClient) as MutationFunction<
        Awaited<I>,
        C
      >,
    });
  };

  return {
    createItem,
    useCreateItem,
  };
}
