import { AxiosInstance } from "axios";
import { useMutation } from "react-query";

import { generateTempId } from "./utils/generateTempId";
import { insertNewItem } from "./utils/insertNewItem";

import { Project } from "@/features/authorizedApp/types";
import { useClient } from "@/hooks/useClient";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { CreateProjectBody } from "@/types";
import { DistributiveOmit } from "@/types/utils";

const DATA_LABEL = "projects";

export async function createProject(
  instance: Promise<AxiosInstance>,
  projectData: CreateProjectBody,
): Promise<Project> {
  const client = await instance;

  return (await client.post("/projects", projectData)).data;
}

function optimisticallyUpdateData(
  newItemData: CreateProjectBody,
  prevData: Project[] | undefined,
) {
  const { direction, triggerId, tempId, ...otherNewData } = newItemData;

  const newItem = {
    id: tempId,
    createdAt: Date.now(),
    isFavorite: otherNewData.isFavorite ?? false,
    taskIds: [],
    ...otherNewData,
  };

  const newData = insertNewItem({
    destination: prevData ?? [],
    itemToInsert: newItem,
    direction,
    triggerId,
  });

  queryClient.setQueryData<Project[]>(DATA_LABEL, newData);
}

type RequestBodyWithoutTempId = DistributiveOmit<CreateProjectBody, "tempId">;

type UseCreateProjectOptions = {
  config?: MutationConfig<
    (projectData: Omit<CreateProjectBody, "tempId">) => Promise<Project>
  >;
};

export const useCreateProject = ({ config }: UseCreateProjectOptions = {}) => {
  const awaitedClient = useClient();
  const tempId = generateTempId();
  const mutationFn = (projectData: RequestBodyWithoutTempId) =>
    createProject(awaitedClient, { ...projectData, tempId });

  return useMutation({
    onMutate: async (newProjectData) => {
      await queryClient.cancelQueries(DATA_LABEL);

      const previousProjectData =
        queryClient.getQueryData<Project[]>(DATA_LABEL);

      optimisticallyUpdateData(
        { ...newProjectData, tempId },
        previousProjectData,
      );

      return { previousProjectData };
    },
    onError: (_, __, context: any) => {
      if (
        context &&
        typeof context === "object" &&
        "previousProjectData" in context
      ) {
        queryClient.setQueryData<Project[]>(
          DATA_LABEL,
          context.previousProjectData,
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
