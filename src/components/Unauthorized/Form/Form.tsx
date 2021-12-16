import styled from "@emotion/styled/macro";
import useLoadingState from "context/LoadingContext";
import { Form as FormikForm, Formik, useFormikContext } from "formik";
import { useAsyncTask } from "hooks/useAsyncTask";
import React from "react";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";

import ConfirmButton from "../ConfirmButton/ConfirmButton";

const StyledForm = styled(FormikForm)`
  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

type HtmlFormProps = React.ComponentPropsWithoutRef<"form">;

type FormProps<InitialValues extends Record<string, string>> = HtmlFormProps & {
  /** Initial values of the form fields. */
  initialValues: InitialValues;
  /** A validation schema for the fields validation before submitting. */
  validationSchema: OptionalObjectSchema<ObjectShape>;
  /** An async action that will be invoked after the form submission. */
  onSubmitAction: (values: InitialValues) => Promise<unknown>;
  /** An action that will be invoked after the successful submission processing. */
  onSuccessAction?: () => void;
  /** Text that will be placed inside the submit button. */
  submitButtonText: string;
};

type FormRendererProps = HtmlFormProps & {
  /**
   * It is a state setter from the parent component. We use it to determine
   * whether or not the form was already submitted.
   */
  setValidate: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormRenderer = ({ setValidate, ...otherProps }: FormRendererProps) => {
  const { isSubmitting } = useFormikContext();

  React.useEffect(() => {
    if (isSubmitting) setValidate(true);
  }, [isSubmitting, setValidate]);

  return <StyledForm noValidate {...otherProps} />;
};

/**
 * It is a component that represents a generic form with `Formik`.
 *
 * @example
 * ```tsx
 *  <Form>
 *    initialValues={initialFormValues}
 *    validationSchema={validationSchema}
 *    onSubmitAction={onSubmitAction}
 *    submitButtonText="Sign In"
 *  <Form>
 *     <InputField name="email" />
 *     <InputField name="password" />
 *  </Form>
 * ```
 */
const Form = <InitialValues extends Record<string, string>>({
  initialValues,
  validationSchema,
  onSubmitAction,
  onSuccessAction,
  submitButtonText,
  children,
  ...otherProps
}: FormProps<InitialValues>) => {
  const [validate, setValidate] = React.useState(false);
  const { isScreenLoading, setIsScreenLoading } = useLoadingState();
  const { isLoading, isSuccess, run } = useAsyncTask(onSubmitAction);

  React.useEffect(() => {
    setIsScreenLoading(isLoading);
  });

  if (isSuccess && onSuccessAction) onSuccessAction();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={run}
      validationSchema={validationSchema}
      validateOnBlur={validate}
      validateOnChange={validate}
    >
      <FormRenderer setValidate={setValidate} {...otherProps}>
        {children}
        <ConfirmButton
          isDisabled={isScreenLoading || isLoading}
          isLoading={isLoading}
          type="submit"
        >
          {submitButtonText}
        </ConfirmButton>
      </FormRenderer>
    </Formik>
  );
};

export default Form;
