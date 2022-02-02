import Chance from "chance";
import React from "react";

import { EditableTitle } from "../EditableTitle/EditableTitle";

import { render, screen, userEvent } from "@/test/testUtils";

const SEED = 12345;
const chance = new Chance(SEED);

function renderComponent() {
  const title = chance.word();
  const onEditEnd = jest.fn();

  render(<EditableTitle title={title} onEditEnd={onEditEnd} />);

  const getForm = () => screen.getByTestId("titleForm");
  const queryForm = () => screen.queryByTestId("titleForm");
  const getHeading = () => screen.getByRole("heading", { name: title });
  const getInputField = () =>
    screen.getByRole("textbox", { name: /change the name of the project/i });
  const getSaveButton = () => screen.getByRole("button", { name: /save/i });
  const getCancelButton = () => screen.getByRole("button", { name: /cancel/i });

  return {
    getForm,
    queryForm,
    getHeading,
    getInputField,
    getSaveButton,
    getCancelButton,
    title,
    onEditEnd,
  };
}

describe("The `EditableTitle` component", () => {
  test("Renders the title as a heading initially", () => {
    const { getHeading } = renderComponent();

    expect(getHeading()).toBeInTheDocument();
  });

  describe("When the title is clicked", () => {
    test("Shows the form", () => {
      const { getHeading, getForm } = renderComponent();

      const headingElement = getHeading();
      userEvent.click(headingElement);

      expect(getForm()).toBeInTheDocument();
    });
  });

  describe("When the component in the form state", () => {
    const clearInputField = (inputField: HTMLInputElement) => {
      inputField.setSelectionRange(0, inputField.value.length);
      userEvent.type(inputField, "{backspace}");
    };

    test("Renders the input field", () => {
      const { getInputField, getHeading } = renderComponent();

      userEvent.click(getHeading());

      expect(getInputField()).toBeInTheDocument();
    });

    test("Renders the control buttons", () => {
      const { getCancelButton, getSaveButton, getHeading } = renderComponent();

      userEvent.click(getHeading());

      expect(getCancelButton()).toBeInTheDocument();
      expect(getSaveButton()).toBeInTheDocument();
    });

    test("The input field initially focused", () => {
      const { getInputField, getHeading } = renderComponent();

      userEvent.click(getHeading());

      expect(getInputField()).toHaveFocus();
    });

    test("The input field initially contains the title as its value", () => {
      const { getInputField, getHeading, title } = renderComponent();

      userEvent.click(getHeading());

      expect(getInputField()).toHaveValue(title);
    });

    test("When the input field is empty, the 'Save' button is disabled", () => {
      const { getInputField, getHeading, getSaveButton } = renderComponent();

      userEvent.click(getHeading());

      const inputField = getInputField() as HTMLInputElement;
      clearInputField(inputField);

      expect(getSaveButton()).toBeDisabled();
    });

    test("When the form is submitted, the 'onEditEnd' callback is called with a new tile", () => {
      const { getInputField, getHeading, getSaveButton, onEditEnd } =
        renderComponent();

      userEvent.click(getHeading());

      const inputField = getInputField() as HTMLInputElement;
      clearInputField(inputField);

      const newTitle = chance.sentence();
      userEvent.type(inputField, newTitle);

      userEvent.click(getSaveButton());

      expect(onEditEnd).toHaveBeenCalledTimes(1);
      expect(onEditEnd).toHaveBeenCalledWith(newTitle);
    });

    test("When the 'Cancel' button is clicked, the component returns to its initial state", () => {
      const { getHeading, getCancelButton, queryForm } = renderComponent();

      userEvent.click(getHeading());

      userEvent.click(getCancelButton());

      expect(getHeading()).toBeInTheDocument();
      expect(queryForm()).not.toBeInTheDocument();
    });
  });
});
