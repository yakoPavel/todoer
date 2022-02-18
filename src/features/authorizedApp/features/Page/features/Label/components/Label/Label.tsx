import styled from "@emotion/styled/macro";
import { groupBy } from "lodash";
import React from "react";
import { useParams } from "react-router-dom";

import { useEditLabelHandlers } from "./hooks/useEditLabelHandlers";

import { useLabel, useTasks } from "@/features/authorizedApp/api";
import { ErrorScreen } from "@/features/authorizedApp/components/ErrorScreen/ErrorScreen";
import { Spinner } from "@/features/authorizedApp/components/Spinner/Spinner";
import {
  useOnDoneStatusChange,
  Page,
  useCorrectLocation,
  usePopupItemsClickHandler,
  PageHeader,
  taskMenuItemsPoor,
} from "@/features/authorizedApp/features/Page";
import { Task } from "@/features/authorizedApp/features/Task";
import { Task as TaskData } from "@/features/authorizedApp/types";

const TasksContainer = styled.ul`
  width: 100%;
  padding: 0 1.5rem;
`;

type TaskListProps = React.ComponentPropsWithoutRef<"ul"> & {
  tasks: TaskData[];
};

const TaskList = ({ tasks, ...otherProps }: TaskListProps) => {
  const onDoneStatusChange = useOnDoneStatusChange();
  const { popupItemsClickHandler } = usePopupItemsClickHandler();

  return (
    <TasksContainer {...otherProps}>
      {tasks.map(({ id, done, name, description }) => (
        <Task
          id={id}
          isDone={Boolean(done)}
          title={name}
          key={id}
          onDoneStatusChange={onDoneStatusChange.bind(null, id)}
          popupClickHandler={popupItemsClickHandler}
          popupMenuItemsConfig={taskMenuItemsPoor}
          description={description}
        />
      ))}
    </TasksContainer>
  );
};

type LabelImplProps = {
  labelId: string;
};

export const LabelImpl = ({ labelId }: LabelImplProps) => {
  const labelQuery = useLabel({ itemId: labelId });
  const allTasksQuery = useTasks();

  useCorrectLocation(labelQuery);

  const { onDeleteLabel, onEditLabel, onLabelTitleEdited } =
    useEditLabelHandlers(labelId);

  if (labelQuery.isError || allTasksQuery.isError) {
    return <ErrorScreen />;
  }

  if (!labelQuery.data || !allTasksQuery.data) {
    return <Spinner size="xl" />;
  }

  const tasksData = allTasksQuery.data.filter(
    (task) => task.labelId === labelId,
  );

  const { completedTasks = [], ongoingTasks = [] } = groupBy(
    tasksData,
    (taskData) => (taskData.done ? "completedTasks" : "ongoingTasks"),
  );

  return (
    <Page>
      <PageHeader
        onDelete={onDeleteLabel}
        onEdit={onEditLabel}
        onTitleEdited={onLabelTitleEdited}
        title={labelQuery.data.name}
        itemName="label"
      />
      <TaskList tasks={ongoingTasks} data-testid="ongoingTasks" />
      <TaskList tasks={completedTasks} data-testid="completedTasks" />
    </Page>
  );
};

export const Label = () => {
  const { labelId } = useParams() as { labelId: string };

  return <LabelImpl labelId={labelId} />;
};
