import React from "react";

import * as Styled from "./styles";

type FormTypes = {
  onSubmit: (newTitle: string) => void;
  onCancel: () => void;
  initialValue: string;
};

const Form = ({ onSubmit, onCancel, initialValue }: FormTypes) => {
  const inputFieldRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useReducer(
    (_: string, event: React.ChangeEvent) =>
      (event.target as HTMLInputElement).value,
    initialValue,
  );

  React.useLayoutEffect(() => {
    inputFieldRef.current?.focus();
  }, []);

  const handleSubmission = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(value);
  };

  return (
    <Styled.Form onSubmit={handleSubmission} data-testid="titleForm">
      <Styled.InputField
        ref={inputFieldRef}
        aria-label="Change the name of the project"
        value={value}
        onChange={setValue}
      />
      <Styled.ControlsWrapper>
        <Styled.SaveButton type="submit" disabled={value === ""}>
          Save
        </Styled.SaveButton>
        <Styled.Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Styled.Button>
      </Styled.ControlsWrapper>
    </Styled.Form>
  );
};

type EditableTitleProps = {
  /** A title. */
  title: string;
  /**
   * A callback that will be called with a new title if the user
   * has edited the old one.
   */
  onEditEnd: (newTitle: string) => void;
};

export const EditableTitle = ({ title, onEditEnd }: EditableTitleProps) => {
  const [editing, setEditing] = React.useState(false);

  if (!editing) {
    return (
      <Styled.Heading as="h1" onClick={() => setEditing(true)}>
        {title}
      </Styled.Heading>
    );
  }

  return (
    <Form
      onCancel={() => setEditing(false)}
      onSubmit={(newTitle) => {
        setEditing(false);
        onEditEnd(newTitle);
      }}
      initialValue={title}
    />
  );
};
