/* eslint-disable no-await-in-loop */
import * as LoadingStateContext from "context/LoadingContext";
import React from "react";
import {
  act,
  fireEvent,
  getControlledPromise,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "test/testUtils";
import { createValidationSchema } from "utils/createValidationSchema";

import { FormikAuthInput } from "../AuthInput/AuthInput";
import { FormikAuthPasswordInput } from "../AuthPasswordInput/AuthPasswordInput";
import Form from "../Form/Form";

/*
  These tests use the `fireEvent` function instead of the `userEvent`
  because of this bug: https://github.com/testing-library/user-event/issues/387
*/

type RenderOptions = {
  errorMessagesMapping?: Record<string, string>;
  successMessage?: string;
};

function renderForm({
  errorMessagesMapping = {},
  successMessage,
}: RenderOptions = {}) {
  const initialValues = {
    email: "",
    password: "",
    passwordConfirmation: "",
  };
  const validationSchema = createValidationSchema([
    { name: "email", type: "email" },
    { name: "password", type: "password" },
  ]);

  const {
    promise,
    reject: rejectAsyncTask,
    resolve: resolveAsyncTask,
  } = getControlledPromise();

  const onSubmitHandler = jest.fn().mockReturnValue(promise);

  render(
    <LoadingStateContext.LoadingStateContextProvider>
      <Form
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmitAction={onSubmitHandler}
        errorMessagesMapping={errorMessagesMapping}
        successMessage={successMessage}
        submitButtonText="Submit"
      >
        <FormikAuthInput
          id="email"
          name="email"
          labelText="Email"
          type="email"
        />
        <FormikAuthPasswordInput
          id="password"
          name="password"
          labelText="Password"
        />
      </Form>
    </LoadingStateContext.LoadingStateContextProvider>,
  );

  const submitButton = screen.getByRole("button", { name: /submit/i });
  const emailField = screen.getByRole("textbox", { name: /email/i });
  const passwordField = screen.getByLabelText(/^password$/i);

  return {
    submitButton,
    emailField,
    passwordField,
    rejectAsyncTask,
    resolveAsyncTask,
    numberOfFieldsInTheForm: 2,
    errorMessagesMapping,
  };
}

/**
 * Types in the text into the specified element.
 */
async function type(element: HTMLElement, text: string) {
  for (let index = 1; index <= text.length; index += 1) {
    await act(async () => {
      fireEvent.change(element, { target: { value: text.slice(0, index) } });
    });
    await new Promise((resolve) => {
      global.setTimeout(resolve, 1);
    });
  }

  await act(async () => {
    fireEvent.blur(element);
  });
}

/* A class that mimics the Firebase Auth Error */
class FirebaseAuthError extends Error {
  constructor(public code: string, ...args: any[]) {
    super(...args);
  }
}

test("doesn't show error messages if the form is not submitted at least once", async () => {
  const { emailField, passwordField } = renderForm();

  expect(screen.queryAllByRole("alert")).toHaveLength(0);

  const incorrectEmail = "incorrect-email@";
  const tooShortPassword = "a";

  await type(emailField, incorrectEmail);
  await type(passwordField, tooShortPassword);

  expect(screen.queryAllByRole("alert")).toHaveLength(0);
});

test("shows the correct error messages if the form is submitted at least one time", async () => {
  const { emailField, passwordField, submitButton, numberOfFieldsInTheForm } =
    renderForm();

  await act(async () => {
    fireEvent.click(submitButton);
  });

  const errorMessages = screen.getAllByRole("alert");
  expect(errorMessages).toHaveLength(numberOfFieldsInTheForm);
  errorMessages.forEach((errorMessage) => {
    expect(errorMessage).toHaveTextContent(/required/i);
  });

  const incorrectEmail = "incorrect-email@";
  await type(emailField, incorrectEmail);
  const emailErrorMessageElement = screen.getByTestId(/email/i);
  await waitFor(() =>
    expect(emailErrorMessageElement).not.toHaveTextContent(/required/i),
  );
  expect(emailErrorMessageElement.textContent).toMatchInlineSnapshot(
    `"The email is invalid"`,
  );

  const tooShortPassword = "a";
  await type(passwordField, tooShortPassword);
  const passwordErrorMessageElement = screen.getByTestId(/password/i);
  expect(passwordErrorMessageElement.textContent).toMatchInlineSnapshot(
    `"The password is too short - should be 8 chars minimum"`,
  );

  const passwordWithoutCapitalLetters = "aaaaaaaaaaaaaaaaaa";
  await type(passwordField, passwordWithoutCapitalLetters);
  expect(passwordErrorMessageElement.textContent).toMatchInlineSnapshot(
    `"The password should contain at least one capital letter"`,
  );

  const passwordWithoutDigits = "aaaaaaaaaaaaaaAAA";
  await type(passwordField, passwordWithoutDigits);
  expect(passwordErrorMessageElement.textContent).toMatchInlineSnapshot(
    `"The password should contain at least on digit"`,
  );
});

test("hides the error messages when the user corrects his input", async () => {
  const { emailField, passwordField, submitButton } = renderForm();

  await act(async () => {
    fireEvent.click(submitButton);
  });

  const correctEmail = "email@gmail.com";
  await type(emailField, correctEmail);

  const correctPassword = "fRfg35_tN49";
  await type(passwordField, correctPassword);

  expect(screen.queryAllByRole("alert")).toHaveLength(0);
});

test("disables the submit button and shows the loading indicator while submitting; restores the original state after.", async () => {
  const { emailField, passwordField, submitButton, resolveAsyncTask } =
    renderForm();

  const correctEmail = "email@gmail.com";
  await type(emailField, correctEmail);

  const correctPassword = "fRfg35_tN49";
  await type(passwordField, correctPassword);

  await act(async () => {
    fireEvent.click(submitButton);
  });

  expect(submitButton).toBeDisabled();
  const spinner = within(submitButton).getByText(/loading/i);
  expect(submitButton).toBeInTheDocument();

  resolveAsyncTask(null);
  await waitForElementToBeRemoved(spinner);
  expect(submitButton).not.toBeDisabled();
});

test("renders an error message if the submit action throws an error", async () => {
  const errorCode = "auth/error";
  const errorMessagesMapping = {
    [errorCode]: "Some error occurred during the authentication.",
  };
  const error = new FirebaseAuthError(errorCode);

  const { emailField, passwordField, submitButton, rejectAsyncTask } =
    renderForm({
      errorMessagesMapping,
    });

  await type(emailField, "example@example.com");
  await type(passwordField, "grgFr45Gl386");

  await act(async () => {
    fireEvent.click(submitButton);
  });

  rejectAsyncTask(error);

  await waitFor(() =>
    expect(
      screen.getByText(errorMessagesMapping[errorCode]),
    ).toBeInTheDocument(),
  );
});

test("renders a message if the submit action successfully resolves and the message is specified", async () => {
  const successMessage = "SOME_MESSAGE";
  const { emailField, passwordField, submitButton, resolveAsyncTask } =
    renderForm({
      successMessage,
    });

  await type(emailField, "example@example.com");
  await type(passwordField, "grgFr45Gl386");

  await act(async () => {
    fireEvent.click(submitButton);
  });

  resolveAsyncTask(null);

  await waitFor(() =>
    expect(screen.getByText(successMessage)).toBeInTheDocument(),
  );
});
