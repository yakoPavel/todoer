import styled from "@emotion/styled/macro";
import React from "react";
import {
  Draggable as OriginalDraggable,
  DraggableProps as OriginalDraggableProps,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import ReactDOM from "react-dom";
import { MdDragIndicator } from "react-icons/md";

const DragHandle = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-100%, -50%);
  cursor: move;
  color: transparent;

  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;

type ContainerProps = {
  isDragging: boolean;
};
const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  position: relative;
  box-shadow: ${({ isDragging }) => {
    return isDragging
      ? `0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)`
      : "unset";
  }};

  &:hover ${DragHandle} {
    color: ${({ theme }) => theme.textSecondary};
  }
`;

type ContentProps = {
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
};
const Content: React.FC<ContentProps> = ({ provided, snapshot, children }) => {
  const isGoingToPortal = snapshot.isDragging;

  const content = (
    <Container
      {...provided.draggableProps}
      ref={provided.innerRef}
      isDragging={snapshot.isDragging}
    >
      <DragHandle {...provided.dragHandleProps} style={{ cursor: "move" }}>
        <MdDragIndicator size="2rem" />
      </DragHandle>
      {children}
    </Container>
  );

  if (!isGoingToPortal) return content;

  return ReactDOM.createPortal(
    content,
    document.querySelector("#root") as Element,
  );
};

type DraggableProps = Omit<OriginalDraggableProps, "children">;

const Draggable: React.FC<DraggableProps> = ({ children, ...otherProps }) => {
  return (
    <OriginalDraggable {...otherProps}>
      {(provided, snapshot) => {
        return (
          <Content provided={provided} snapshot={snapshot}>
            {children}
          </Content>
        );
      }}
    </OriginalDraggable>
  );
};

export default Draggable;
