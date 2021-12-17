import { FormikAuthInput } from "components/Unauthorized/AuthInput/AuthInput";
import { FormikAuthPasswordInput } from "components/Unauthorized/AuthPasswordInput/AuthPasswordInput";
import Form from "components/Unauthorized/Form/Form";
import React from "react";
import { useNavigate } from "react-router-dom";
import { signUpWithPassword } from "utils/authentication";
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

const errorMessagesMapping = {
  "auth/email-already-in-use": "The account with this email already exists",
  "auth/invalid-email": "The submitted email is invalid",
  "auth/too-may-requests": "You have sent too many request. Try again later.",
  "auth/weak-password": "The submitted password is too weak",
};

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
      errorMessagesMapping={errorMessagesMapping}
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
