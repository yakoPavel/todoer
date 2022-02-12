import { AxiosInstance } from "axios";
import { MutationFunction, useMutation } from "react-query";

import { Task, Label, Project } from "@/features/authorizedApp/types";
import { useClient } from "@/hooks/useClient";
import { MutationConfig, queryClient } from "@/lib/react-query";

type ItemData = Task | Label | Project;

type CreateMutationOptions = {
  /** A label for the data in react-query. */
  dataLabel: unknown[];
  /** An endpoint for the update. */
  endpoint: string;
};

export function generateDeleteMutation<I extends ItemData = ItemData>({
  dataLabel,
  endpoint,
}: CreateMutationOptions) {
  const deleteItem = async (
    instance: Promise<AxiosInstance>,
    itemId: string,
  ): Promise<I> => {
    const client = await instance;

    return (await client.delete(`${endpoint}/${itemId}`)).data;
  };

  type UseDeleteOptions = {
    config?: MutationConfig<(itemId: string) => Promise<I>>;
  };

  const useDelete = ({ config }: UseDeleteOptions = {}) => {
    const awaitedClient = useClient();

    return useMutation({
      onMutate: async (itemToDeleteId) => {
        await queryClient.cancelQueries(dataLabel);

        const previousData = queryClient.getQueryData<I[]>(dataLabel);
        const itemToDelete = queryClient.getQueryData<I>([
          dataLabel,
          itemToDeleteId,
        ]);

        // Optimistic update
        queryClient.setQueryData(
          dataLabel,
          previousData?.filter(({ id }) => id !== itemToDeleteId),
        );
        queryClient.removeQueries([...dataLabel, itemToDeleteId]);

        return { previousData, itemToDelete };
      },
      onError: (_, itemToDeleteId, context: any) => {
        queryClient.setQueryData<I[]>(dataLabel, context.previousData);
        queryClient.setQueryData<I>(
          [...dataLabel, itemToDeleteId],
          context.itemToDelete,
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(dataLabel);
      },
      ...config,
      mutationFn: deleteItem.bind(null, awaitedClient) as MutationFunction<
        Awaited<I>
      >,
    });
  };

  return {
    deleteItem,
    useDelete,
  };
}
