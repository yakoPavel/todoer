import { Alert, AlertDescription, AlertIcon } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import {
  Form as FormikForm,
  Formik,
  FormikHelpers,
  useFormikContext,
} from "formik";
import React from "react";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";

import { ConfirmButton } from "./ConfirmButton/ConfirmButton";

import { useLoadingState } from "@/context/LoadingContext";
import { useAsyncTask } from "@/hooks/useAsyncTask";

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
  /** A message that will be shown after the successful submission processing. */
  successMessage?: string;
  /** Error messages  */
  errorMessagesMapping: Record<string, string>;
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

function isFirebaseAuthError(error: Error): error is Error & { code: string } {
  return "code" in error;
}

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
export const Form = <InitialValues extends Record<string, string>>({
  initialValues,
  validationSchema,
  onSubmitAction,
  onSuccessAction,
  successMessage,
  submitButtonText,
  errorMessagesMapping,
  children,
  ...otherProps
}: FormProps<InitialValues>) => {
  const [validate, setValidate] = React.useState(false);
  const { isScreenLoading, setIsScreenLoading } = useLoadingState();
  const { isLoading, isSuccess, error, run, reset } =
    useAsyncTask(onSubmitAction);

  React.useEffect(() => {
    setIsScreenLoading(isLoading);

    if (isSuccess && onSuccessAction) onSuccessAction();
  });

  const onSubmit = (
    values: InitialValues,
    { resetForm }: FormikHelpers<InitialValues>,
  ) => {
    reset();
    resetForm();
    run(values);
  };

  const getMessage = () => {
    if (error && isFirebaseAuthError(error)) {
      return (
        <Alert
          status="error"
          variant="solid"
          borderRadius="5px"
          data-testid="errorMessage"
        >
          <AlertIcon width="2rem" height="2rem" />{" "}
          <AlertDescription whiteSpace="normal" textAlign="center">
            {errorMessagesMapping[error.code] ??
              "An error has happened. Please try again."}
          </AlertDescription>
        </Alert>
      );
    }
    if (isSuccess && successMessage) {
      return (
        <Alert
          status="success"
          variant="solid"
          borderRadius="5px"
          data-testid="successMessage"
        >
          <AlertIcon width="2rem" height="2rem" />{" "}
          <AlertDescription
            whiteSpace="normal"
            textAlign="center"
            lineHeight={1.2}
            fontSize="1.4rem"
          >
            {successMessage}
          </AlertDescription>
        </Alert>
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
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
        {getMessage()}
      </FormRenderer>
    </Formik>
  );
};
