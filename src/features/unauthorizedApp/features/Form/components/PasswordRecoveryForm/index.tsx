import React from "react";

import { FormikAuthInput } from "../AuthInput/AuthInput";
import { Form } from "../Form/Form";

import { createValidationSchema } from "@/features/unauthorizedApp/utils/createValidationSchema";
import { sendPasswordResetEmail } from "@/utils/authentication";

const errorMessagesMapping = {
  "auth/user-not-found": "The user with the specified email doesn't exist",
  "auth/invalid-email": "The submitted email is invalid",
  "auth/too-may-requests": "You have sent too many request. Try again later.",
};

export const PasswordRecoveryForm = () => {
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
