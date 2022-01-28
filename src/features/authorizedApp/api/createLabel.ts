import { AxiosInstance } from "axios";
import { useMutation } from "react-query";

import { generateTempId } from "./utils/generateTempId";
import { insertNewItem } from "./utils/insertNewItem";

import { Label } from "@/features/authorizedApp/types";
import { useClient } from "@/hooks/useClient";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { CreateLabelBody } from "@/types";
import { DistributiveOmit } from "@/types/utils";

const DATA_LABEL = "labels";

export async function createLabel(
  instance: Promise<AxiosInstance>,
  projectData: CreateLabelBody,
): Promise<Label> {
  const client = await instance;

  return (await client.post("/labels", projectData)).data;
}

function optimisticallyUpdateData(
  newItemData: CreateLabelBody,
  prevData: Label[] | undefined,
) {
  const { direction, triggerId, tempId, ...otherNewData } = newItemData;

  const newItem = {
    id: tempId,
    createdAt: Date.now(),
    isFavorite: otherNewData.isFavorite ?? false,
    ...otherNewData,
  };

  const newData = insertNewItem({
    destination: prevData ?? [],
    itemToInsert: newItem,
    direction,
    triggerId,
  });

  queryClient.setQueryData<Label[]>(DATA_LABEL, newData);
}

type RequestBodyWithoutTempId = DistributiveOmit<CreateLabelBody, "tempId">;

type UseCreateProjectOptions = {
  config?: MutationConfig<
    (projectData: RequestBodyWithoutTempId) => Promise<Label>
  >;
};

export const useCreateLabel = ({ config }: UseCreateProjectOptions = {}) => {
  const awaitedClient = useClient();
  const tempId = generateTempId();

  const mutationFn = (newLabelData: RequestBodyWithoutTempId) =>
    createLabel(awaitedClient, { ...newLabelData, tempId });

  return useMutation({
    onMutate: async (newLabelData) => {
      await queryClient.cancelQueries(DATA_LABEL);

      const previousLabelData = queryClient.getQueryData<Label[]>(DATA_LABEL);

      optimisticallyUpdateData({ ...newLabelData, tempId }, previousLabelData);

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
