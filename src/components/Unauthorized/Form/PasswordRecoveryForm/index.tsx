import { FormikAuthInput } from "components/Unauthorized/AuthInput/AuthInput";
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
      <ConfirmButton type="submit">Recover my password</ConfirmButton>
    </Form>
  );
};

export default LoginWithPasswordForm;
