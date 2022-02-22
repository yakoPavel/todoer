import React from "react";

import {
  TaskForm,
  TaskFormButtons,
  TaskFormEditingArea,
} from "../TaskForm/TaskForm";

import { useEditTask } from "@/features/authorizedApp/api";

type EditTaskProps = {
  /** An initial title of the task. */
  initialTitle: string;
  /** An initial description of the task. */
  initialDescription: string;
  /** A callback that will be called when the user cancel changes. */
  onCancel: () => void;
  /** An id of the task. */
  id: string;
};

export const EditTask = ({
  initialDescription,
  initialTitle,
  onCancel,
  id,
}: EditTaskProps) => {
  const editTaskMutation = useEditTask();

  const onSubmit = (
    taskId: string,
    newTitle: string,
    newDescription: string,
  ) => {
    editTaskMutation.mutate({
      id: taskId,
      name: newTitle,
      description: newDescription,
    });
  };

  return (
    <TaskForm
      initialDescription={initialDescription}
      initialTitle={initialTitle}
      onCancel={onCancel}
      onSubmit={onSubmit.bind(null, id)}
      data-testid="editTaskForm"
    >
      <TaskFormEditingArea />
      <TaskFormButtons submitButtonName="Save" />
    </TaskForm>
  );
};
