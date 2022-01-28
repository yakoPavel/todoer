import { AxiosInstance } from "axios";
import { omit } from "lodash";
import { useMutation } from "react-query";

import { Label } from "@/features/authorizedApp/types";
import { useClient } from "@/hooks/useClient";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { PatchLabelBody } from "@/types";

const DATA_LABEL = "labels";

function optimisticallyUpdateData(newLabelData: PatchLabelBody) {
  const prevData = queryClient.getQueryData<Label[]>(DATA_LABEL);

  if (!prevData) return;

  const labelToEditIndex = prevData.findIndex(
    ({ id }) => id === newLabelData.id,
  );

  if (labelToEditIndex === -1) return;

  const newData = prevData.slice();
  const labelToEdit = prevData[labelToEditIndex];

  newData[labelToEditIndex] = {
    ...labelToEdit,
    ...omit(newLabelData, "position"),
  };

  queryClient.setQueryData<Label[]>(DATA_LABEL, newData);
}

export async function editLabel(
  instance: Promise<AxiosInstance>,
  projectData: PatchLabelBody,
): Promise<Label> {
  const client = await instance;

  return (await client.patch("/labels", projectData)).data;
}

type UseEditLabelOptions = {
  config?: MutationConfig<(projectData: PatchLabelBody) => Promise<Label>>;
};

export const useEditLabel = ({ config }: UseEditLabelOptions = {}) => {
  const awaitedClient = useClient();

  return useMutation({
    onMutate: async (newLabelData) => {
      await queryClient.cancelQueries(DATA_LABEL);

      const previousLabelData = queryClient.getQueryData<Label[]>(DATA_LABEL);

      optimisticallyUpdateData(newLabelData);

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
    mutationFn: editLabel.bind(null, awaitedClient),
  });
};
