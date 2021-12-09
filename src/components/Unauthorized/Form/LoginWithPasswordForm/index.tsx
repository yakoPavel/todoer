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
    { name: "password", type: "onlyRequired" },
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
      <ConfirmButton type="submit">Sign in</ConfirmButton>
    </Form>
  );
};

export default LoginWithPasswordForm;
