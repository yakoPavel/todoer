import { VisuallyHidden } from "@chakra-ui/react";
import React from "react";
import { BsThreeDots } from "react-icons/bs";

import { CompletionCheckbox } from "../CompletionCheckbox/CompletionCheckbox";
import { LabelButton } from "../LabelButton/LabelButton";

import { useTaskPopup } from "./hooks/useTaskPopup";
import * as Styled from "./styles";

const ClickPopupTrigger = React.forwardRef<HTMLButtonElement>((_, ref) => {
  return (
    <Styled.ClickPopupTriggerContainer ref={ref}>
      <BsThreeDots aria-hidden="true" size="2rem" />
      <VisuallyHidden>Open the menu</VisuallyHidden>
    </Styled.ClickPopupTriggerContainer>
  );
});
ClickPopupTrigger.displayName = "ClickPopupTrigger";

export type TaskProps = {
  /** A title of the task. */
  title: string;
  /** A description of the task. */
  description?: string;
  /** A callback that will be called when the user marks/unmarks the task as done. */
  onDoneStatusChange: (checked: boolean) => void;
  /** A click handler for the popup menu. */
  popupClickHandler: (clickedItemId: string, popupId: string) => void;
  /** Whether the task is done or not. */
  isDone: boolean;
  /** An id of the task. */
  id: string;
};

export const Task = ({
  title,
  description,
  isDone,
  onDoneStatusChange,
  popupClickHandler,
  id,
}: TaskProps) => {
  const { Popup, clickTriggerRef, contextMenuTriggerRef, isPopupVisible } =
    useTaskPopup({
      clickHandler: popupClickHandler,
      isTaskDone: isDone,
      taskId: id,
    });

  return (
    <>
      <Styled.Container ref={contextMenuTriggerRef} data-testid="task">
        <Styled.CheckboxContainer>
          <CompletionCheckbox
            isChecked={isDone}
            onChange={onDoneStatusChange}
          />
        </Styled.CheckboxContainer>
        <Styled.TaskContentContainer>
          <Styled.TitleContainer>
            <Styled.Title isDone={isDone}>{title}</Styled.Title>
            {!isDone && (
              <Styled.LabelButtonContainer>
                <LabelButton taskId={id} />
              </Styled.LabelButtonContainer>
            )}
          </Styled.TitleContainer>
          <Styled.Description>{description}</Styled.Description>
        </Styled.TaskContentContainer>
        <ClickPopupTrigger ref={clickTriggerRef} />
      </Styled.Container>
      {isPopupVisible && Popup}
    </>
  );
};
