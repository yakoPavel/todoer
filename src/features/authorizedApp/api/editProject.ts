import { AxiosInstance } from "axios";
import { useMutation } from "react-query";

import { Project } from "@/features/authorizedApp/types";
import { useClient } from "@/hooks/useClient";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { PatchProjectBody } from "@/types";

function optimisticallyUpdateData(newProjectData: PatchProjectBody) {
  const prevData = queryClient.getQueryData<Project[]>("projects");

  if (!prevData) return;

  const projectToEditIndex = prevData.findIndex(
    ({ id }) => id === newProjectData.id,
  );

  if (projectToEditIndex === -1) return;

  const newData = prevData.slice();
  const projectToEdit = prevData[projectToEditIndex];

  newData[projectToEditIndex] = { ...projectToEdit, ...newProjectData };

  queryClient.setQueryData<Project[]>("projects", newData);
}

export async function editProject(
  instance: Promise<AxiosInstance>,
  projectData: PatchProjectBody,
): Promise<Project> {
  const client = await instance;

  return (await client.patch("/projects", projectData)).data;
}

type UseEditProjectOptions = {
  config?: MutationConfig<(projectData: PatchProjectBody) => Promise<Project>>;
};

export const useEditProject = ({ config }: UseEditProjectOptions = {}) => {
  const awaitedClient = useClient();

  return useMutation({
    onMutate: async (newProjectData) => {
      await queryClient.cancelQueries("projects");

      const previousProjectData =
        queryClient.getQueryData<Project[]>("projects");

      optimisticallyUpdateData(newProjectData);

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
    mutationFn: editProject.bind(null, awaitedClient),
  });
};
