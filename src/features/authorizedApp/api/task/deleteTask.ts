import { generateDeleteMutation } from "../utils/deleteItem/generateDeleteMutation";

import { Task } from "@/features/authorizedApp/types";

export const { deleteItem: deleteTask, useDelete: useDeleteTask } =
  generateDeleteMutation<Task>({
    dataLabel: ["tasks"],
    endpoint: "/tasks",
  });
