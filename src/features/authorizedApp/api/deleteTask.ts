import { AxiosInstance } from "axios";
import { useMutation } from "react-query";

import { Task } from "@/features/authorizedApp/types";
import { useClient } from "@/hooks/useClient";
import { MutationConfig, queryClient } from "@/lib/react-query";

const DATA_LABEL = "tasks";

export async function deleteProject(
  instance: Promise<AxiosInstance>,
  taskId: string,
): Promise<Task> {
  const client = await instance;

  return (await client.delete(`/tasks/${taskId}`)).data;
}

type UseDeleteTaskOptions = {
  config?: MutationConfig<(taskId: string) => Promise<Task>>;
};

export const useDeleteProject = ({ config }: UseDeleteTaskOptions = {}) => {
  const awaitedClient = useClient();

  return useMutation({
    onMutate: async (taskToDeleteId) => {
      await queryClient.cancelQueries(DATA_LABEL);

      const previousTaskData = queryClient.getQueryData<Task[]>(DATA_LABEL);

      queryClient.setQueryData(
        DATA_LABEL,
        previousTaskData?.filter(({ id }) => id !== taskToDeleteId),
      );

      return { previousTaskData };
    },
    onError: (_, __, context: any) => {
      if (
        context &&
        typeof context === "object" &&
        "previousTaskData" in context
      ) {
        queryClient.setQueryData<Task[]>(DATA_LABEL, context.previousTaskData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(DATA_LABEL);
    },
    ...config,
    mutationFn: deleteProject.bind(null, awaitedClient),
  });
};
