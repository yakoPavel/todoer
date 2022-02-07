import { AxiosInstance } from "axios";
import { omit } from "lodash";
import { useMutation } from "react-query";

import { Task } from "@/features/authorizedApp/types";
import { useClient } from "@/hooks/useClient";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { PatchTaskBody } from "@/types";

const DATA_LABEL = "tasks";

function optimisticallyUpdateData(newTaskData: PatchTaskBody) {
  const prevData = queryClient.getQueryData<Task[]>(DATA_LABEL);

  if (!prevData) return;

  const taskToEditIndex = prevData.findIndex(({ id }) => id === newTaskData.id);

  if (taskToEditIndex === -1) return;

  const newData = prevData.slice();
  const taskToEdit = prevData[taskToEditIndex];

  newData[taskToEditIndex] = {
    ...taskToEdit,
    ...omit(newTaskData, "position"),
  };

  queryClient.setQueryData<Task[]>(DATA_LABEL, newData);
}

export async function editTask(
  instance: Promise<AxiosInstance>,
  taskData: PatchTaskBody,
): Promise<Task> {
  const client = await instance;

  return (await client.patch("/tasks", taskData)).data;
}

type UseEditTaskOptions = {
  config?: MutationConfig<(taskData: PatchTaskBody) => Promise<Task>>;
};

export const useEditTask = ({ config }: UseEditTaskOptions = {}) => {
  const awaitedClient = useClient();

  return useMutation({
    onMutate: async (newTaskData) => {
      await queryClient.cancelQueries(DATA_LABEL);

      const previousTaskData = queryClient.getQueryData<Task[]>(DATA_LABEL);

      optimisticallyUpdateData(newTaskData);

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
    mutationFn: editTask.bind(null, awaitedClient),
  });
};
