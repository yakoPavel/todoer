import React from "react";

import { Form } from "../Form/Form";

import { generateTestData } from "./utils/generateTestData";

import { isMockFunction, render, screen, userEvent } from "@/test/testUtils";

describe("Form", () => {
  describe("Rendering", () => {
    test("Renders the form", () => {
      const { props } = generateTestData();
      render(<Form {...props} />);

      expect(screen.getByTestId("modalForm")).toBeInTheDocument();
    });

    test("Renders all the form fields", () => {
      const { props } = generateTestData();
      render(<Form {...props} />);

      props.formFieldsConfig.forEach((fieldConfig) => {
        expect(screen.getByLabelText(fieldConfig.label)).toBeInTheDocument();
      });
    });

    test("Renders control buttons", () => {
      const { props } = generateTestData();
      render(<Form {...props} />);

      expect(
        screen.getByRole("button", { name: props.submitButtonTitle }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: props.cancelButtonTitle }),
      ).toBeInTheDocument();
    });
  });

  describe("When the required fields are not filled", () => {
    test("Doesn't allow to submit the form", () => {
      const { props } = generateTestData();
      render(<Form {...props} />);

      const submitButton = screen.getByRole("button", {
        name: props.submitButtonTitle,
      });
      userEvent.click(submitButton);

      expect(props.onSubmit).not.toHaveBeenCalled();
    });
  });

  describe("When all the required fields are filled", () => {
    test("Allows to submit the form", () => {
      const { props, formData } = generateTestData();
      render(<Form {...props} />);

      props.formFieldsConfig.forEach((fieldConfig) => {
        const inputElement = screen.getByLabelText(fieldConfig.label);
        if (fieldConfig.type === "text") {
          userEvent.type(inputElement, formData[fieldConfig.label] as string);
        }
      });
      const submitButton = screen.getByRole("button", {
        name: props.submitButtonTitle,
      });
      userEvent.click(submitButton);
      expect(props.onSubmit).toHaveBeenCalled();
    });
  });

  describe("When the form is submitted", () => {
    test("Invokes the 'onSubmit' callback with the form data", () => {
      // Arrange
      const { props, formData } = generateTestData();
      render(<Form {...props} />);

      // Act
      props.formFieldsConfig.forEach((fieldConfig) => {
        const inputElement = screen.getByLabelText(fieldConfig.label);
        if (fieldConfig.type === "switch") {
          if (formData[fieldConfig.label]) userEvent.click(inputElement);
        } else if (fieldConfig.type === "text") {
          userEvent.type(inputElement, formData[fieldConfig.label] as string);
        }
      });
      const submitButton = screen.getByRole("button", {
        name: props.submitButtonTitle,
      });
      userEvent.click(submitButton);
      isMockFunction(props.onSubmit);

      // Assert
      expect(props.onSubmit).toHaveBeenCalledTimes(1);
      expect(props.onSubmit).toHaveBeenCalledWith(formData);
    });
  });

  describe("When the form is dismissed", () => {
    test("Invokes the 'onDismiss' callback", () => {
      const { props } = generateTestData();
      render(<Form {...props} />);

      const cancelButton = screen.getByRole("button", {
        name: props.cancelButtonTitle,
      });
      userEvent.click(cancelButton);

      expect(props.onDismiss).toHaveBeenCalledTimes(1);
    });
  });
});
