import React from "react";

import { useCorrectDescriptionHeight } from "./hooks/useCorrectTextAreaHeight";
import { useFocusAfterPaddingClick } from "./hooks/useFocusAfterPaddingClick";
import { useFormValues } from "./hooks/useFormValues";
import * as Styled from "./styles";

import { Button } from "@/components/Button/Button";

const MAX_TEXT_AREA_HEIGHT = 250;

export type TitleElement = HTMLInputElement | null;
export type DescriptionElement = HTMLTextAreaElement | null;

type FormProps = React.ComponentPropsWithRef<"form">;

export type TaskFormProps = Omit<FormProps, "onSubmit"> & {
  /** An initial title of the task. */
  initialTitle: string;
  /** An initial description of the task. */
  initialDescription: string;
  /** A callback that will be called when the user submits changes. */
  onSubmit: (title: string, description: string) => void;
  /** A callback that will be called when the user cancel changes. */
  onCancel: () => void;
  /**
   * A callback that will be called when the form should be closed.
   * If it is not specified, the `onCancel` prop will be used.
   * */
  onCloseForm?: () => void;
  /** A name of the submit button. */
  submitButtonName?: string;
};

export const TaskForm: React.FC<TaskFormProps> = ({
  initialDescription,
  initialTitle,
  onSubmit,
  onCancel,
  onCloseForm = onCancel,
  submitButtonName = "Save",
  ...otherProps
}: TaskFormProps) => {
  const [titleElement, setTitleElement] = React.useState<TitleElement>(null);
  const [descriptionElement, setDescriptionElement] =
    React.useState<DescriptionElement>(null);

  useCorrectDescriptionHeight(MAX_TEXT_AREA_HEIGHT, descriptionElement);

  const { onEditingAreaClick } = useFocusAfterPaddingClick(
    titleElement,
    descriptionElement,
  );

  const {
    titleValue,
    onTitleChange,
    descriptionValue,
    onDescriptionChange,
    isFormValid,
  } = useFormValues(initialTitle, initialDescription);

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit(titleValue, descriptionValue);
    onCloseForm();
  };

  return (
    <Styled.Form {...otherProps} onSubmit={onFormSubmit}>
      <Styled.EditingAreaWrapper onClick={onEditingAreaClick} data-editing-area>
        <Styled.TitleField
          value={titleValue}
          onChange={onTitleChange}
          ref={setTitleElement}
          placeholder="Task name"
          aria-label="Task name"
        />
        <Styled.DescriptionField
          value={descriptionValue}
          onChange={onDescriptionChange}
          ref={setDescriptionElement}
          placeholder="Description"
          aria-label="Task description"
        />
      </Styled.EditingAreaWrapper>
      <Styled.ButtonsContainer>
        <Button type="submit" disabled={!isFormValid}>
          {submitButtonName}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Styled.ButtonsContainer>
    </Styled.Form>
  );
};
