import { AxiosInstance } from "axios";
import { useMutation } from "react-query";

import { generateTempId } from "./utils/generateTempId";

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

type RequestBodyWithoutTempId = Omit<CreateLabelBody, "tempId">;

type UseCreateProjectOptions = {
  config?: MutationConfig<
    (projectData: RequestBodyWithoutTempId) => Promise<Label>
  >;
};

export const useCreateLabel = ({ config }: UseCreateProjectOptions = {}) => {
  const awaitedClient = useClient();
  const tempId = generateTempId();
  const mutationFn = (labelData: RequestBodyWithoutTempId) =>
    createLabel(awaitedClient, { ...labelData, tempId });

  return useMutation({
    onMutate: async (newLabelData) => {
      await queryClient.cancelQueries(DATA_LABEL);

      const previousLabelData = queryClient.getQueryData<Label[]>(DATA_LABEL);

      queryClient.setQueryData<Label[]>(DATA_LABEL, [
        ...(previousLabelData ?? []),
        {
          id: generateTempId(),
          createdAt: Date.now(),
          isFavorite: newLabelData.isFavorite ?? false,
          ...newLabelData,
        },
      ]);

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
    mutationFn,
  });
};
