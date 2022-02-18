import styled from "@emotion/styled/macro";
import React from "react";

import {
  useOnDoneStatusChange,
  usePopupItemsClickHandler,
  taskMenuItemsPoor,
} from "@/features/authorizedApp/features/Page";
import { Task } from "@/features/authorizedApp/features/Task";
import { Task as TaskData } from "@/features/authorizedApp/types";

const Container = styled.ul`
  width: 100%;
  padding: 0 1.5rem;
`;

type CompletedTasksProps = {
  tasks: TaskData[];
};

export const CompletedTasks = ({ tasks }: CompletedTasksProps) => {
  const onDoneStatusChange = useOnDoneStatusChange();
  const { popupItemsClickHandler } = usePopupItemsClickHandler();

  return (
    <Container data-testid="completedTasks">
      {tasks.map(({ id, description, name }) => (
        <Task
          id={id}
          description={description}
          title={name}
          isDone={true}
          onDoneStatusChange={onDoneStatusChange.bind(null, id)}
          popupClickHandler={popupItemsClickHandler}
          key={id}
          popupMenuItemsConfig={taskMenuItemsPoor}
        />
      ))}
    </Container>
  );
};
