import { AxiosInstance } from "axios";
import { useMutation } from "react-query";

import { Label } from "@/features/authorizedApp/types";
import { useClient } from "@/hooks/useClient";
import { MutationConfig, queryClient } from "@/lib/react-query";

const DATA_LABEL = "labels";

export async function deleteLabel(
  instance: Promise<AxiosInstance>,
  labelId: string,
): Promise<Label> {
  const client = await instance;

  return (await client.delete(`/labels/${labelId}`)).data;
}

type UseDeleteLabelOptions = {
  config?: MutationConfig<(labelId: string) => Promise<Label>>;
};

export const useDeleteLabel = ({ config }: UseDeleteLabelOptions = {}) => {
  const awaitedClient = useClient();

  return useMutation({
    onMutate: async (labelToDeleteId) => {
      await queryClient.cancelQueries(DATA_LABEL);

      const previousLabelData = queryClient.getQueryData<Label[]>(DATA_LABEL);

      queryClient.setQueryData(
        DATA_LABEL,
        previousLabelData?.filter(({ id }) => id !== labelToDeleteId),
      );

      return { previousLabelData };
    },
    onError: (_, __, context: any) => {
      if (
        context &&
        typeof context === "object" &&
        "previousLabelData" in context
      ) {
        queryClient.setQueryData<Label[]>(
          DATA_LABEL,
          context.previousLabelData,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(DATA_LABEL);
    },
    ...config,
    mutationFn: deleteLabel.bind(null, awaitedClient),
  });
};
