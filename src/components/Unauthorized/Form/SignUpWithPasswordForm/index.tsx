import { FormikAuthInput } from "components/Unauthorized/AuthInput/AuthInput";
import { FormikAuthPasswordInput } from "components/Unauthorized/AuthPasswordInput/AuthPasswordInput";
import Form from "components/Unauthorized/Form/Form";
import React from "react";
import { useNavigate } from "react-router-dom";
import { signUpWithPassword } from "utils/authentication/signUpWithPassword";
import { createValidationSchema } from "utils/createValidationSchema";

const initialFormValues = {
  email: "",
  password: "",
  passwordConfirmation: "",
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

const SignUpWithPasswordForm = () => {
  const navigate = useNavigate();

  const onSubmitAction = ({ email, password }: typeof initialFormValues) =>
    signUpWithPassword(email, password);

  const onSuccessAction = () => navigate("/", { replace: true });

  return (
    <Form
      initialValues={initialFormValues}
      validationSchema={validationSchema}
      onSubmitAction={onSubmitAction}
      onSuccessAction={onSuccessAction}
      submitButtonText="Sign Up"
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
    </Form>
  );
};

export default SignUpWithPasswordForm;
