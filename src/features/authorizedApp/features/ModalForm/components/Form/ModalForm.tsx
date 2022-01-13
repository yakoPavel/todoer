import { Heading } from "@chakra-ui/react";
import React from "react";

import { FormState, useFormState } from "./hooks/useFormState";
import * as Styled from "./styles";

export type FormFieldConfig = {
  /** A label of the field. */
  label: string;
  /** A type of the field. */
  type: "text" | "color" | "switch";
  /** Whether or not the field is required. */
  required?: boolean;
};

type ModalProps<Config extends FormFieldConfig[]> = {
  /** A title of the Card. */
  title: string;
  /** A config based on which the form field will be rendered. */
  formFieldsConfig: Config;
  /** A callback that will be called when the modal is dismissed. */
  onDismiss: () => void;
  /** A callback that will be called when the form is submitted. */
  onSubmit: (formValues: FormState<Config>) => void;
  /** A title for the submit button. */
  submitButtonTitle?: string;
  /** A title for the cancel button. */
  cancelButtonTitle?: string;
};

const ModalForm = <Config extends FormFieldConfig[]>({
  title,
  onDismiss,
  onSubmit,
  formFieldsConfig,
  submitButtonTitle = "Submit",
  cancelButtonTitle = "Cancel",
}: ModalProps<Config>) => {
  const { formFields, formState } = useFormState(formFieldsConfig);

  const handleSubmission = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formState);
  };

  return (
    <Styled.Container>
      <Styled.Card>
        <Styled.TitleContainer>
          <Heading as="h3" size="md">
            {title}
          </Heading>
        </Styled.TitleContainer>
        <Styled.FormContainer>
          <Styled.Form onSubmit={handleSubmission}>
            {formFields}
            <Styled.ControlsContainer>
              <Styled.ControlButton onClick={onDismiss} variant="secondary">
                {cancelButtonTitle}
              </Styled.ControlButton>
              <Styled.ControlButton type="submit" disabled={!formState.isValid}>
                {submitButtonTitle}
              </Styled.ControlButton>
            </Styled.ControlsContainer>
          </Styled.Form>
        </Styled.FormContainer>
      </Styled.Card>
    </Styled.Container>
  );
};

export default ModalForm;
