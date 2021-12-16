import { FormikAuthInput } from "components/Unauthorized/AuthInput/AuthInput";
import { FormikAuthPasswordInput } from "components/Unauthorized/AuthPasswordInput/AuthPasswordInput";
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
    { name: "password", type: "onlyRequired" },
  ]);

  const onSubmitAction = ({ email, password }: typeof initialValues) =>
    Promise.resolve();

  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmitAction={onSubmitAction}
      submitButtonText="Sign in"
    >
      <FormikAuthInput id="email" name="email" labelText="Email" type="email" />
      <FormikAuthPasswordInput
        id="password"
        name="password"
        labelText="Password"
      />
    </Form>
  );
};

export default LoginWithPasswordForm;
