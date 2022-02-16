import React from "react";

import { useEditTask } from "@/features/authorizedApp/api";

export function useOnDoneStatusChange() {
  const editTaskMutation = useEditTask();

  const onDoneStatusChange = React.useCallback(
    (taskId: string, checked: boolean) => {
      editTaskMutation.mutate({
        id: taskId,
        done: checked,
      });
    },
    [editTaskMutation],
  );

  return onDoneStatusChange;
}
