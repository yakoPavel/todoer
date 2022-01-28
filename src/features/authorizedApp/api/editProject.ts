import { AxiosInstance } from "axios";
import { omit } from "lodash";
import { useMutation } from "react-query";

import { Project } from "@/features/authorizedApp/types";
import { useClient } from "@/hooks/useClient";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { PatchProjectBody } from "@/types";

const DATA_LABEL = "projects";

function optimisticallyUpdateData(newProjectData: PatchProjectBody) {
  const prevData = queryClient.getQueryData<Project[]>(DATA_LABEL);

  if (!prevData) return;

  const projectToEditIndex = prevData.findIndex(
    ({ id }) => id === newProjectData.id,
  );

  if (projectToEditIndex === -1) return;

  const newData = prevData.slice();
  const projectToEdit = prevData[projectToEditIndex];

  newData[projectToEditIndex] = {
    ...projectToEdit,
    ...omit(newProjectData, "position"),
  };

  queryClient.setQueryData<Project[]>(DATA_LABEL, newData);
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
      await queryClient.cancelQueries(DATA_LABEL);

      const previousProjectData =
        queryClient.getQueryData<Project[]>(DATA_LABEL);

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
          DATA_LABEL,
          context.previousProjectData,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(DATA_LABEL);
    },
    ...config,
    mutationFn: editProject.bind(null, awaitedClient),
  });
};
