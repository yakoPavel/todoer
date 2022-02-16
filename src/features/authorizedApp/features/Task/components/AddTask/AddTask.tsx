import React from "react";

import { TaskForm } from "../TaskForm/TaskForm";

import { useCreateTask } from "@/features/authorizedApp/api";

type AddTaskBaseProps = {
  /** A callback that will be called when the user cancel changes. */
  onCancel: () => void;
  /** An id of the project the task adds to. */
  projectId: string;
};

type WithDirection = {
  /** The direction of the addition. */
  direction: "above" | "below";
  /** An id of the task relative to which the new one will be added. */
  triggerId: string;
};

type WithoutDirection = {
  /** The direction of the addition. */
  direction?: never;
  /** An id of the task relative to which the new one will be added. */
  triggerId?: never;
};

type AddTaskProps =
  | (AddTaskBaseProps & WithoutDirection)
  | (AddTaskBaseProps & WithDirection);

export const AddTask = (props: AddTaskProps) => {
  const { onCancel, projectId } = props;
  const createTaskMutation = useCreateTask();

  const onSubmit = (title: string, description: string) => {
    if (props.direction) {
      const { direction, triggerId } = props;

      createTaskMutation.mutate({
        name: title,
        description,
        projectId,
        direction,
        triggerId,
      });
    } else {
      createTaskMutation.mutate({
        name: title,
        description,
        projectId,
      });
    }
  };

  return (
    <TaskForm
      initialDescription=""
      initialTitle=""
      onCancel={onCancel}
      submitButtonName="Add"
      onSubmit={onSubmit}
      data-testid="addTaskForm"
    />
  );
};
