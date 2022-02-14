import { omit } from "lodash";

import { generateEditMutation } from "../utils/editItem/generateEditMutation";

import { Task } from "@/features/authorizedApp/types";
import { PatchTaskBody } from "@/types";

export const { editItem: editTask, useEdit: useEditTask } =
  generateEditMutation({
    dataLabel: ["tasks"],
    endpoint: "/tasks",
    getOptimisticUpdate: (newData: PatchTaskBody): Partial<Task> => {
      const update: Partial<Task> = {
        ...omit(newData, ["position", "labelId"]),
      };
      // The label id from the request can be `null`, but on the client it is stored
      // only as a string.
      if (newData.labelId) {
        update.labelId = newData.labelId;
      }
      return update;
    },
    correctDataAfterOptimisticUpdate: ({
      suggestedEditedItem,
      suggestedAllItems,
      itemBeforeChanges,
    }) => {
      if (itemBeforeChanges.done !== suggestedEditedItem.done) {
        suggestedAllItems.sort((a, b) => {
          if (suggestedEditedItem.id === a.id) return 1;
          if (suggestedEditedItem.id === b.id) return -1;
          return 0;
        });
      }

      return {
        editedItem: suggestedEditedItem,
        allItems: suggestedAllItems,
      };
    },
  });
