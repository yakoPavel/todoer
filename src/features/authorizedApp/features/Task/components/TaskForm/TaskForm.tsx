import React from "react";

import { useCorrectDescriptionHeight } from "./hooks/useCorrectTextAreaHeight";
import { useFocusAfterPaddingClick } from "./hooks/useFocusAfterPaddingClick";
import { useFormValues } from "./hooks/useFormValues";
import * as Styled from "./styles";

import { Button } from "@/components/Button/Button";
import { createContext } from "@/context/createContext";

const MAX_TEXT_AREA_HEIGHT = 250;

export type TitleElement = HTMLInputElement | null;
export type DescriptionElement = HTMLTextAreaElement | null;

type TaskFormContext = {
  titleElement: TitleElement;
  setTitleElement: React.Dispatch<React.SetStateAction<TitleElement>>;
  descriptionElement: DescriptionElement;
  setDescriptionElement: React.Dispatch<
    React.SetStateAction<DescriptionElement>
  >;

  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  titleValue: string;
  onDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  descriptionValue: string;

  isFormValid: boolean;

  onCancel: () => void;
};
const [useTaskFormContext, TaskFormContextProvider] =
  createContext<TaskFormContext>();

type TaskFormEditingAreaProps = {
  /** A class name that will be applied to the container. */
  className?: string;
};
export const TaskFormEditingArea = ({
  className,
}: TaskFormEditingAreaProps) => {
  const {
    titleElement,
    setTitleElement,
    descriptionElement,
    setDescriptionElement,
    onTitleChange,
    titleValue,
    onDescriptionChange,
    descriptionValue,
  } = useTaskFormContext();

  useCorrectDescriptionHeight(MAX_TEXT_AREA_HEIGHT, descriptionElement);

  const { onEditingAreaClick } = useFocusAfterPaddingClick(
    titleElement,
    descriptionElement,
  );

  return (
    <Styled.EditingAreaWrapper
      className={className}
      onClick={onEditingAreaClick}
      data-editing-area
    >
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
  );
};

type TaskFormButtonsProps = {
  /** A name of the submit button. */
  submitButtonName?: string;
  /** A class name that will be applied to the container. */
  className?: string;
};
export const TaskFormButtons = ({
  submitButtonName = "Save",
  className,
}: TaskFormButtonsProps) => {
  const { isFormValid, onCancel } = useTaskFormContext();

  return (
    <Styled.ButtonsContainer className={className}>
      <Button type="submit" disabled={!isFormValid}>
        {submitButtonName}
      </Button>
      <Button type="button" variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </Styled.ButtonsContainer>
  );
};

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
};

export const TaskForm: React.FC<TaskFormProps> = ({
  initialDescription,
  initialTitle,
  onSubmit,
  onCancel,
  onCloseForm = onCancel,
  children,
  ...otherProps
}: TaskFormProps) => {
  const [titleElement, setTitleElement] = React.useState<TitleElement>(null);
  const [descriptionElement, setDescriptionElement] =
    React.useState<DescriptionElement>(null);

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
      <TaskFormContextProvider
        value={{
          descriptionElement,
          setDescriptionElement,
          titleElement,
          setTitleElement,
          titleValue,
          onTitleChange,
          descriptionValue,
          onDescriptionChange,
          isFormValid,
          onCancel,
        }}
      >
        {children}
      </TaskFormContextProvider>
    </Styled.Form>
  );
};
