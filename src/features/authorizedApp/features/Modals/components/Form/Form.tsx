import { Heading } from "@chakra-ui/react";
import React from "react";

import { FormState, useFormState } from "./hooks/useFormState";
import * as Styled from "./styles";

import Overlay from "@/components/Overlay/Overlay";

type BaseFormFieldConfig = {
  /** A label of the field. */
  label: string;
  /** Whether or not the field is required. */
  required?: boolean;
};

type TextBasedFieldConfig = {
  /** A type of the field. */
  type: "text" | "color";
  /** An initial value of the field. */
  initialValue?: string;
};
type SwitchFieldConfig = {
  /** A type of the field. */
  type: "switch";
  /** An initial value of the field. */
  initialValue?: boolean;
};

export type FormFieldConfig =
  | (BaseFormFieldConfig & TextBasedFieldConfig)
  | (BaseFormFieldConfig & SwitchFieldConfig);

export type FormProps<Config extends FormFieldConfig[]> = {
  /** A title of the Card. */
  title: string;
  /** A config based on which the form field will be rendered. */
  formFieldsConfig: Config;
  /** A callback that will be called when the modal is dismissed. */
  onDismiss: () => void;
  /** A callback that will be called when the form is submitted. */
  onSubmit: (formValues: FormState<Config>["values"]) => void;
  /** A title for the submit button. */
  submitButtonTitle?: string;
  /** A title for the cancel button. */
  cancelButtonTitle?: string;
};

const Form = <Config extends FormFieldConfig[]>({
  title,
  onDismiss,
  onSubmit,
  formFieldsConfig,
  submitButtonTitle = "Submit",
  cancelButtonTitle = "Cancel",
}: FormProps<Config>) => {
  const { formFields, formState } = useFormState(formFieldsConfig);

  const handleSubmission = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formState.values as FormState<Config>["values"]);
  };

  return (
    <Overlay data-testid="modalForm">
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
              <Styled.ControlButton
                type="button"
                onClick={onDismiss}
                variant="secondary"
              >
                {cancelButtonTitle}
              </Styled.ControlButton>
              <Styled.ControlButton type="submit" disabled={!formState.isValid}>
                {submitButtonTitle}
              </Styled.ControlButton>
            </Styled.ControlsContainer>
          </Styled.Form>
        </Styled.FormContainer>
      </Styled.Card>
    </Overlay>
  );
};

export default Form;
