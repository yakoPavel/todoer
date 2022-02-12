import { AxiosInstance } from "axios";
import { MutationFunction, useMutation } from "react-query";

import { Task, Label, Project } from "@/features/authorizedApp/types";
import { useClient } from "@/hooks/useClient";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { PatchLabelBody, PatchProjectBody, PatchTaskBody } from "@/types";

type PatchBody = PatchLabelBody | PatchProjectBody | PatchTaskBody;

type ItemData = Task | Label | Project;

type GetOptimisticUpdate<P extends PatchBody, I extends ItemData> = (
  data: P,
) => Partial<I>;

type CreateMutationOptions<P extends PatchBody, I extends ItemData> = {
  /** A label for the data in react-query. */
  dataLabel: unknown[];
  /** An endpoint for the update. */
  endpoint: string;
  /**
   * A getter for the data that should be merged with the current item data for
   * the optimistic update.
   * */
  getOptimisticUpdate: GetOptimisticUpdate<P, I>;
};

function optimisticallyUpdateData<P extends PatchBody, I extends ItemData>(
  patchData: P,
  dataLabel: unknown[],
  getOptimisticUpdate: GetOptimisticUpdate<P, I>,
) {
  const prevData = queryClient.getQueryData<I[]>(dataLabel);

  if (!prevData) return;

  const itemToEditIndex = prevData.findIndex(({ id }) => id === patchData.id);

  if (itemToEditIndex === -1) return;

  const newData = prevData.slice();
  const taskToEdit = newData[itemToEditIndex];

  newData[itemToEditIndex] = {
    ...taskToEdit,
    ...getOptimisticUpdate(patchData),
  };

  // Set data for all items
  queryClient.setQueryData<I[]>(dataLabel, newData);

  // Set data for an individual item
  queryClient.setQueryData<I>(
    [...dataLabel, patchData.id],
    newData[itemToEditIndex],
  );
}

export function generateEditMutation<P extends PatchBody, I extends ItemData>({
  dataLabel,
  getOptimisticUpdate,
  endpoint,
}: CreateMutationOptions<P, I>) {
  const editItem = async (
    instance: Promise<AxiosInstance>,
    data: P,
  ): Promise<I> => {
    const client = await instance;

    return (await client.patch(endpoint, data)).data;
  };

  type UseEditOptions = {
    config?: MutationConfig<(data: P) => Promise<I>>;
  };

  const useEdit = ({ config }: UseEditOptions = {}) => {
    const awaitedClient = useClient();

    return useMutation({
      onMutate: async (newData) => {
        await queryClient.cancelQueries(dataLabel);

        const prevData = queryClient.getQueryData<I[]>(dataLabel);
        const itemBeforeUpdate = queryClient.getQueryData<I>([
          dataLabel,
          newData.id,
        ]);

        optimisticallyUpdateData(newData, dataLabel, getOptimisticUpdate);

        return { prevData, itemBeforeUpdate };
      },
      onError: (_, newData, context: any) => {
        queryClient.setQueryData<I[]>(dataLabel, context.prevData);
        queryClient.setQueryData<I>(
          [dataLabel, newData.id],
          context.itemBeforeUpdate,
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(dataLabel);
      },
      ...config,
      mutationFn: editItem.bind(null, awaitedClient) as MutationFunction<
        Awaited<I>,
        P
      >,
    });
  };

  return {
    editItem,
    useEdit,
  };
}
