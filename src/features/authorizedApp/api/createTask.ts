import { AxiosInstance } from "axios";
import { useMutation } from "react-query";

import { generateTempId } from "./utils/generateTempId";
import { insertNewItem } from "./utils/insertNewItem";

import { Task } from "@/features/authorizedApp/types";
import { useClient } from "@/hooks/useClient";
import { MutationConfig, queryClient } from "@/lib/react-query";
import { CreateTaskBody } from "@/types";
import { DistributiveOmit } from "@/types/utils";

const DATA_LABEL = "tasks";

export async function createTask(
  instance: Promise<AxiosInstance>,
  taskData: CreateTaskBody,
): Promise<Task> {
  const client = await instance;

  return (await client.post("/tasks", taskData)).data;
}

function optimisticallyUpdateData(
  newItemData: CreateTaskBody,
  prevData: Task[] | undefined,
) {
  const { direction, triggerId, tempId, ...otherNewData } = newItemData;

  const newItem = {
    id: tempId,
    createdAt: Date.now(),
    taskIds: [],
    done: false,
    labelId: undefined,
    ...otherNewData,
  };

  const newData = insertNewItem({
    destination: prevData ?? [],
    itemToInsert: newItem,
    direction,
    triggerId,
  });

  queryClient.setQueryData<Task[]>(DATA_LABEL, newData);
}

type RequestBodyWithoutTempId = DistributiveOmit<CreateTaskBody, "tempId">;

type UseCreateTaskOptions = {
  config?: MutationConfig<
    (taskData: RequestBodyWithoutTempId) => Promise<Task>
  >;
};

export const useCreateProject = ({ config }: UseCreateTaskOptions = {}) => {
  const awaitedClient = useClient();
  const tempId = generateTempId();
  const mutationFn = (taskData: RequestBodyWithoutTempId) =>
    createTask(awaitedClient, { ...taskData, tempId });

  return useMutation({
    onMutate: async (newTaskData) => {
      await queryClient.cancelQueries(DATA_LABEL);

      const previousTaskData = queryClient.getQueryData<Task[]>(DATA_LABEL);

      optimisticallyUpdateData({ ...newTaskData, tempId }, previousTaskData);

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
    mutationFn,
  });
};
