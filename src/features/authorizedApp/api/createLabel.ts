import { AxiosInstance } from "axios";
import { useMutation } from "react-query";

import { Label } from "@/features/authorizedApp/types";
import { useClient } from "@/hooks/useClient";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { CreateLabelBody } from "@/types";

const DATA_LABEL = "labels";

export async function createLabel(
  instance: Promise<AxiosInstance>,
  projectData: CreateLabelBody,
): Promise<Label> {
  const client = await instance;

  return (await client.post("/labels", projectData)).data;
}

type UseCreateProjectOptions = {
  config?: MutationConfig<(projectData: CreateLabelBody) => Promise<Label>>;
};

export const useCreateLabel = ({ config }: UseCreateProjectOptions = {}) => {
  const awaitedClient = useClient();

  return useMutation({
    onMutate: async (newLabelData) => {
      await queryClient.cancelQueries(DATA_LABEL);

      const previousProjectData = queryClient.getQueryData<Label[]>(DATA_LABEL);

      queryClient.setQueryData<Label[]>(DATA_LABEL, [
        ...(previousProjectData ?? []),
        {
          id: String(Date.now()),
          createdAt: Date.now(),
          isFavorite: newLabelData.isFavorite ?? false,
          ...newLabelData,
        },
      ]);

      return { previousProjectData };
    },
    onError: (_, __, context: any) => {
      if (
        context &&
        typeof context === "object" &&
        "previousProjectData" in context
      ) {
        queryClient.setQueryData<Label[]>(
          "project",
          context.previousProjectData,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(DATA_LABEL);
    },
    ...config,
    mutationFn: createLabel.bind(null, awaitedClient),
  });
};
