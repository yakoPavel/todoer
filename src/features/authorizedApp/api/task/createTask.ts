import { omit } from "lodash";

import { generateCreateMutation } from "../utils/createItem/generateCreateMutation";

import { Task } from "@/features/authorizedApp/types";
import { CreateTaskBody } from "@/types";

export const { createItem: createTask, useCreateItem: useCreateTask } =
  generateCreateMutation({
    dataLabel: ["tasks"],
    endpoint: "/tasks",
    invalidateDataLabels: [["tasks"], ["projects"]],
    getNewItemForOptimisticUpdate: (newItemData: CreateTaskBody): Task => {
      const { tempId } = newItemData;

      return {
        id: tempId,
        createdAt: Date.now(),
        done: false,
        labelId: undefined,
        ...omit(newItemData, ["tempId", "direction", "triggerId"]),
      };
    },
  });
