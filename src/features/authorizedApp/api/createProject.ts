import { AxiosInstance } from "axios";
import { useMutation } from "react-query";

import { generateTempId } from "./utils/generateTempId";

import { Project } from "@/features/authorizedApp/types";
import { useClient } from "@/hooks/useClient";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { CreateProjectBody } from "@/types";

const DATA_LABEL = "projects";

export async function createProject(
  instance: Promise<AxiosInstance>,
  projectData: CreateProjectBody,
): Promise<Project> {
  const client = await instance;

  return (await client.post("/projects", projectData)).data;
}

type UseCreateProjectOptions = {
  config?: MutationConfig<
    (projectData: Omit<CreateProjectBody, "tempId">) => Promise<Project>
  >;
};

export const useCreateProject = ({ config }: UseCreateProjectOptions = {}) => {
  const awaitedClient = useClient();
  const tempId = generateTempId();
  const mutationFn = (projectData: Omit<CreateProjectBody, "tempId">) =>
    createProject(awaitedClient, { ...projectData, tempId });

  return useMutation({
    onMutate: async (newProjectData) => {
      await queryClient.cancelQueries(DATA_LABEL);

      const previousProjectData =
        queryClient.getQueryData<Project[]>(DATA_LABEL);

      queryClient.setQueryData(DATA_LABEL, [
        ...(previousProjectData ?? []),
        {
          id: generateTempId(),
          createdAt: Date.now(),
          taskIds: [],
          isFavorite: newProjectData.isFavorite ?? false,
          ...newProjectData,
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
        queryClient.setQueryData<Project[]>(
          "project",
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
