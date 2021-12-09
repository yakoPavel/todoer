import styled from "@emotion/styled/macro";
import { Form as FormikForm, Formik, useFormikContext } from "formik";
import React from "react";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";

const StyledForm = styled(FormikForm)`
  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

type HtmlFormProps = React.ComponentPropsWithoutRef<"form">;

type FormProps<InitialValues extends Record<string, string>> = HtmlFormProps & {
  initialValues: InitialValues;
  validationSchema: OptionalObjectSchema<ObjectShape>;
  onFormSubmit: (values: InitialValues) => void;
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
 */
const Form = <InitialValues extends Record<string, string>>({
  initialValues,
  validationSchema,
  onFormSubmit,
  ...otherProps
}: FormProps<InitialValues>) => {
  const [validate, setValidate] = React.useState(false);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onFormSubmit}
      validationSchema={validationSchema}
      validateOnBlur={validate}
      validateOnChange={validate}
    >
      <FormRenderer setValidate={setValidate} {...otherProps} />
    </Formik>
  );
};

export default Form;
