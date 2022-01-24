import { AxiosInstance } from "axios";
import { useMutation } from "react-query";

import { Project } from "@/features/authorizedApp/types";
import { useClient } from "@/hooks/useClient";
import { MutationConfig, queryClient } from "@/lib/react-query";

const DATA_LABEL = "projects";

export async function deleteProject(
  instance: Promise<AxiosInstance>,
  projectId: string,
): Promise<Project> {
  const client = await instance;

  return (await client.delete(`/projects/${projectId}`)).data;
}

type UseDeleteProjectOptions = {
  config?: MutationConfig<(projectId: string) => Promise<Project>>;
};

export const useDeleteProject = ({ config }: UseDeleteProjectOptions = {}) => {
  const awaitedClient = useClient();

  return useMutation({
    onMutate: async (projectToDeleteId) => {
      await queryClient.cancelQueries(DATA_LABEL);

      const previousProjectData =
        queryClient.getQueryData<Project[]>(DATA_LABEL);

      queryClient.setQueryData(
        DATA_LABEL,
        previousProjectData?.filter(({ id }) => id !== projectToDeleteId),
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
          "project",
          context.previousProjectData,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(DATA_LABEL);
    },
    ...config,
    mutationFn: deleteProject.bind(null, awaitedClient),
  });
};
