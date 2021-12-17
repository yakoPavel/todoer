import { FormikAuthInput } from "components/Unauthorized/AuthInput/AuthInput";
import Form from "components/Unauthorized/Form/Form";
import React from "react";
import { sendPasswordResetEmail } from "utils/authentication";
import { createValidationSchema } from "utils/createValidationSchema";

const errorMessagesMapping = {
  "auth/user-not-found": "The user with the specified email doesn't exist",
  "auth/invalid-email": "The submitted email is invalid",
  "auth/too-may-requests": "You have sent too many request. Try again later.",
};

const LoginWithPasswordForm = () => {
  const initialValues = {
    email: "",
  };
  const validationSchema = createValidationSchema([
    { name: "email", type: "email" },
  ]);

  const onSubmitAction = ({ email }: typeof initialValues) =>
    sendPasswordResetEmail(email);

  return (
    <Form
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmitAction={onSubmitAction}
      errorMessagesMapping={errorMessagesMapping}
      successMessage="A letter with the instructions was sent to your email"
      submitButtonText="Recover my password"
    >
      <FormikAuthInput id="email" name="email" labelText="Email" type="email" />
    </Form>
  );
};

export default LoginWithPasswordForm;
