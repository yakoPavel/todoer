import styled from "@emotion/styled/macro";
import React from "react";
import {
  Droppable as OriginalDroppable,
  DroppableProps as OriginalDroppableProps,
} from "react-beautiful-dnd";

type ContainerProps = {
  isDraggingOver: boolean;
};
const Container = styled.div<ContainerProps>`
  background-color: ${({ isDraggingOver, theme }) =>
    isDraggingOver ? theme.backgroundTertiary : "transparent"};
  border-radius: 5px;
`;

type DroppableProps = Omit<OriginalDroppableProps, "children">;

const Droppable: React.FC<DroppableProps> = ({ children, ...otherProps }) => {
  return (
    <OriginalDroppable {...otherProps}>
      {(provided, snapshot) => (
        <Container
          {...provided.droppableProps}
          ref={provided.innerRef}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {children}
          {provided.placeholder}
        </Container>
      )}
    </OriginalDroppable>
  );
};

export default Droppable;
