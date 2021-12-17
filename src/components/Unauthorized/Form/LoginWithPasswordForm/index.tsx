import { FormikAuthInput } from "components/Unauthorized/AuthInput/AuthInput";
import { FormikAuthPasswordInput } from "components/Unauthorized/AuthPasswordInput/AuthPasswordInput";
import Form from "components/Unauthorized/Form/Form";
import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPassword } from "utils/authentication";
import { createValidationSchema } from "utils/createValidationSchema";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = createValidationSchema([
  { name: "email", type: "email" },
  { name: "password", type: "onlyRequired" },
]);

const errorMessagesMapping = {
  "auth/invalid-email": "The submitted email is invalid",
  "auth/too-may-requests": "You have sent too many request. Try again later.",
  "auth/user-not-found": "Incorrect email or password",
  "auth/wrong-password": "Incorrect email or password",
};

const LoginWithPasswordForm = () => {
  const navigate = useNavigate();

  const onSubmitAction = ({ email, password }: typeof initialValues) =>
    signInWithPassword(email, password);

  const onSuccessAction = () => navigate("/", { replace: true });

  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmitAction={onSubmitAction}
      errorMessagesMapping={errorMessagesMapping}
      onSuccessAction={onSuccessAction}
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
