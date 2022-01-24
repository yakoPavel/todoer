import { AxiosInstance } from "axios";
import { useMutation } from "react-query";

import { Project } from "@/features/authorizedApp/types";
import { useClient } from "@/hooks/useClient";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { CreateProjectBody } from "@/types";

export async function createProject(
  instance: Promise<AxiosInstance>,
  projectData: CreateProjectBody,
): Promise<Project> {
  const client = await instance;

  return (await client.post("/projects", projectData)).data;
}

type UseCreateProjectOptions = {
  config?: MutationConfig<(projectData: CreateProjectBody) => Promise<Project>>;
};

export const useCreateProject = ({ config }: UseCreateProjectOptions = {}) => {
  const awaitedClient = useClient();

  return useMutation({
    onMutate: async (newProjectData) => {
      await queryClient.cancelQueries("projects");

      const previousProjectData =
        queryClient.getQueryData<Project[]>("projects");

      queryClient.setQueryData("projects", [
        ...(previousProjectData ?? []),
        {
          id: String(Date.now()),
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
      queryClient.invalidateQueries("projects");
    },
    ...config,
    mutationFn: createProject.bind(null, awaitedClient),
  });
};
