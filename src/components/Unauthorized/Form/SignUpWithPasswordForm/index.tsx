import { FormikAuthInput } from "components/Unauthorized/AuthInput/AuthInput";
import { FormikAuthPasswordInput } from "components/Unauthorized/AuthPasswordInput/AuthPasswordInput";
import ConfirmButton from "components/Unauthorized/ConfirmButton/ConfirmButton";
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
    { name: "password", type: "password" },
    {
      name: "passwordConfirmation",
      type: "passwordConfirmation",
      passwordName: "password",
    },
  ]);

  const onSubmit = (values: typeof initialValues) => {
    console.log(values);
  };

  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onFormSubmit={onSubmit}
    >
      <FormikAuthInput id="email" name="email" labelText="Email" type="email" />
      <FormikAuthPasswordInput
        id="password"
        name="password"
        labelText="Password"
      />
      <FormikAuthPasswordInput
        id="passwordConfirmation"
        name="passwordConfirmation"
        labelText="Confirm your password"
      />
      <ConfirmButton type="submit">Sign up</ConfirmButton>
    </Form>
  );
};

export default LoginWithPasswordForm;
