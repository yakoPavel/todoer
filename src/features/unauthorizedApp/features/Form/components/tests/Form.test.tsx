/* eslint-disable no-await-in-loop */
import Chance from "chance";
import React from "react";

import { FormikAuthInput } from "../AuthInput/AuthInput";
import { FormikAuthPasswordInput } from "../AuthPasswordInput/AuthPasswordInput";
import Form from "../Form";

import * as LoadingStateContext from "@/context/LoadingContext";
import { createValidationSchema } from "@/features/unauthorizedApp/utils/createValidationSchema";
import {
  act,
  fireEvent,
  getControlledPromise,
  render,
  screen,
  waitFor,
  within,
} from "@/test/testUtils";

const SEED = 12345;
const chance = new Chance(SEED);

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

/**
 * Submits the form with valid data.
 */
async function submitFormWithValidData(
  renderResult: ReturnType<typeof renderForm>,
) {
  const correctEmail = "email@gmail.com";
  await type(renderResult.emailField, correctEmail);

  const correctPassword = "fRfg35_tN49";
  await type(renderResult.passwordField, correctPassword);

  await act(async () => {
    fireEvent.click(renderResult.submitButton);
  });
}

/* A class that mimics the Firebase Auth Error */
class FirebaseAuthError extends Error {
  constructor(public code: string, ...args: any[]) {
    super(...args);
  }
}

describe("The `Form` component", () => {
  describe("When the form is rendered, and the user hasn't done anything yet", () => {
    test("Doesn't show error messages", async () => {
      renderForm();

      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("When some fields are invalid, but the form wasn't submitted at least once", () => {
    test("Doesn't show error messages", async () => {
      const { emailField, passwordField } = renderForm();

      const incorrectEmail = chance.word();
      const tooShortPassword = chance.word({ length: 2 });

      await type(emailField, incorrectEmail);
      await type(passwordField, tooShortPassword);

      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("When the form is submitted at least one time and has invalid fields", () => {
    let renderResult: ReturnType<typeof renderForm>;

    beforeEach(async () => {
      renderResult = renderForm();

      await act(async () => {
        fireEvent.click(renderResult.submitButton);
      });
    });

    test("When required fields are not filled in, shows the correct error message", () => {
      const { numberOfFieldsInTheForm } = renderResult;

      const errorMessages = screen.getAllByRole("alert");
      expect(errorMessages).toHaveLength(numberOfFieldsInTheForm);
      errorMessages.forEach((errorMessage) => {
        expect(errorMessage).toHaveTextContent(/required/i);
      });
    });

    test("When the typed-in email is not valid, shows the correct error message", async () => {
      const { emailField } = renderResult;

      const incorrectEmail = chance.word();
      await type(emailField, incorrectEmail);

      const emailErrorMessageElement = screen.getByTestId(/email/i);
      await waitFor(() =>
        expect(emailErrorMessageElement.textContent).toMatchInlineSnapshot(
          `"The email is invalid"`,
        ),
      );
    });

    test("When the typed-in password is too short, shows the correct error message", async () => {
      const { passwordField } = renderResult;

      const tooShortPassword = chance.word({ length: 2 });
      await type(passwordField, tooShortPassword);

      await type(passwordField, tooShortPassword);
      const passwordErrorMessageElement = screen.getByTestId(/password/i);
      await waitFor(() =>
        expect(passwordErrorMessageElement.textContent).toMatchInlineSnapshot(
          `"The password is too short - should be 8 chars minimum"`,
        ),
      );
    });

    test("When the typed-in password doesn't contain capital letters, shows the correct error message", async () => {
      const { passwordField } = renderResult;

      const passwordWithoutCapitalLetters = chance
        .word({ length: 10 })
        .toLowerCase();
      await type(passwordField, passwordWithoutCapitalLetters);

      const passwordErrorMessageElement = screen.getByTestId(/password/i);
      await waitFor(() =>
        expect(passwordErrorMessageElement.textContent).toMatchInlineSnapshot(
          `"The password should contain at least one capital letter"`,
        ),
      );
    });
    test("When the typed-in password doesn't contain numbers, shows the correct error message", async () => {
      const { passwordField } = renderResult;

      const passwordWithoutCapitalLetters =
        chance.word({ length: 10 }) + chance.word().toUpperCase();
      await type(passwordField, passwordWithoutCapitalLetters);

      const passwordErrorMessageElement = screen.getByTestId(/password/i);
      await waitFor(() =>
        expect(passwordErrorMessageElement.textContent).toMatchInlineSnapshot(
          `"The password should contain at least on digit"`,
        ),
      );
    });

    test("When the user corrects his input, hides error messages", async () => {
      const { emailField, passwordField } = renderResult;

      const correctEmail = chance.email();
      await type(emailField, correctEmail);

      const correctPassword = "fRfg35_tN49";
      await type(passwordField, correctPassword);

      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("When the form is submitting", () => {
    let renderResult: ReturnType<typeof renderForm>;

    beforeEach(async () => {
      renderResult = renderForm();
      await submitFormWithValidData(renderResult);
    });

    test("Disables the submit button", () => {
      const { submitButton } = renderResult;

      expect(submitButton).toBeDisabled();
    });

    test("Renders a loading indicator within the submit button", () => {
      const { submitButton } = renderResult;

      const spinner = within(submitButton).getByText(/loading/i);
      expect(spinner).toBeInTheDocument();
    });
  });

  describe("When the form was successfully submitted", () => {
    test("Clears all the fields", async () => {
      const renderResult = renderForm();
      const { emailField, passwordField, resolveAsyncTask } = renderResult;

      await submitFormWithValidData(renderResult);
      await act(async () => resolveAsyncTask(null));

      expect(emailField).toHaveTextContent("");
      expect(passwordField).toHaveTextContent("");
    });

    test("Enables the submit button and removes a loading indicator", async () => {
      const renderResult = renderForm();
      const { submitButton, resolveAsyncTask } = renderResult;

      await submitFormWithValidData(renderResult);
      await act(async () => resolveAsyncTask(null));

      await waitFor(() =>
        expect(
          within(submitButton).queryByText(/loading/i),
        ).not.toBeInTheDocument(),
      );
      expect(submitButton).toBeEnabled();
    });

    test("When the `successMessage` is specified, renders a message with its content", async () => {
      const successMessage = chance.sentence();
      const renderResult = renderForm({ successMessage });
      const { resolveAsyncTask } = renderResult;

      await submitFormWithValidData(renderResult);
      await act(async () => resolveAsyncTask(null));

      await waitFor(() =>
        expect(screen.getByText(successMessage)).toBeInTheDocument(),
      );
    });

    test("When the `successMessage` is not specified, doesn't render a message with its content", async () => {
      const renderResult = renderForm();
      const { resolveAsyncTask } = renderResult;

      await submitFormWithValidData(renderResult);
      await act(async () => resolveAsyncTask(null));

      expect(screen.queryByTestId("successMessage")).not.toBeInTheDocument();
    });
  });

  describe("When the submit action throws an error", () => {
    test("Renders an error message", async () => {
      const errorCode = "auth/error";
      const errorMessagesMapping = {
        [errorCode]: "Some error occurred during the authentication.",
      };
      const error = new FirebaseAuthError(errorCode);
      const renderResult = renderForm({ errorMessagesMapping });

      await submitFormWithValidData(renderResult);
      await act(async () => renderResult.rejectAsyncTask(error));

      await waitFor(() =>
        expect(
          screen.getByText(errorMessagesMapping[errorCode]),
        ).toBeInTheDocument(),
      );
    });
  });
});
