import { FormikAuthInput } from "components/Unauthorized/AuthInput/AuthInput";
import Form from "components/Unauthorized/Form/Form";
import React from "react";
import { createValidationSchema } from "utils/createValidationSchema";

const LoginWithPasswordForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = createValidationSchema([
    { name: "email", type: "email" },
  ]);

  const onSubmitAction = ({ email, password }: typeof initialValues) =>
    Promise.resolve();

  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmitAction={onSubmitAction}
      submitButtonText="Recover my password"
    >
      <FormikAuthInput id="email" name="email" labelText="Email" type="email" />
    </Form>
  );
};

export default LoginWithPasswordForm;
