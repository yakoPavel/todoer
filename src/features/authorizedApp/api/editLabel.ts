import { AxiosInstance } from "axios";
import { useMutation } from "react-query";

import { Label } from "@/features/authorizedApp/types";
import { useClient } from "@/hooks/useClient";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { PatchLabelBody } from "@/types";

function optimisticallyUpdateData(newLabelData: PatchLabelBody) {
  const prevData = queryClient.getQueryData<Label[]>("labels");

  if (!prevData) return;

  const labelToEditIndex = prevData.findIndex(
    ({ id }) => id === newLabelData.id,
  );

  if (labelToEditIndex === -1) return;

  const newData = prevData.slice();
  const labelToEdit = prevData[labelToEditIndex];

  newData[labelToEditIndex] = { ...labelToEdit, ...newLabelData };

  queryClient.setQueryData<Label[]>("labels", newData);
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
      await queryClient.cancelQueries("labels");

      const previousLabelData = queryClient.getQueryData<Label[]>("labels");

      optimisticallyUpdateData(newLabelData);

      return { previousLabelData };
    },
    onError: (_, __, context: any) => {
      if (
        context &&
        typeof context === "object" &&
        "previousProjectData" in context
      ) {
        queryClient.setQueryData<Label[]>(
          "labels",
          context.previousProjectData,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries("labels");
    },
    ...config,
    mutationFn: editLabel.bind(null, awaitedClient),
  });
};
