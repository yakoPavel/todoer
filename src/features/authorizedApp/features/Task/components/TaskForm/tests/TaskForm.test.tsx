import React from "react";

import {
  TaskForm,
  TaskFormProps,
  TaskFormButtons,
  TaskFormEditingArea,
} from "../TaskForm";

import { screen, render, userEvent } from "@/test/testUtils";
import { UniqueChance } from "@/test/UniqueChance";

const SEED = 12345;
const chance = new UniqueChance(SEED);

function renderComponent(override?: Partial<TaskFormProps>) {
  const props: TaskFormProps = {
    initialTitle: chance.word(),
    initialDescription: chance.sentence(),
    onSubmit: jest.fn(),
    onCancel: jest.fn(),
    ...override,
  };

  const getTitleField = () =>
    screen.getByRole("textbox", { name: /task name/i });
  const getDescriptionField = () =>
    screen.getByRole("textbox", { name: /description/i });
  const getSubmitButton = () => screen.getByRole("button", { name: /save/i });
  const getCancelButton = () => screen.getByRole("button", { name: /cancel/i });

  render(
    <TaskForm {...props}>
      <TaskFormEditingArea />
      <TaskFormButtons />
    </TaskForm>,
  );

  return {
    props,
    getTitleField,
    getDescriptionField,
    getSubmitButton,
    getCancelButton,
  };
}

describe("The `TaskForm` component", () => {
  describe("Rendering", () => {
    test("Renders the title field", () => {
      const { getTitleField } = renderComponent();

      expect(getTitleField()).toBeInTheDocument();
    });

    test("Renders the description field", () => {
      const { getDescriptionField } = renderComponent();

      expect(getDescriptionField()).toBeInTheDocument();
    });

    test("Renders the submit button", () => {
      const { getSubmitButton } = renderComponent();

      expect(getSubmitButton()).toBeInTheDocument();
    });

    test("Renders the cancel button", () => {
      const { getCancelButton } = renderComponent();

      expect(getCancelButton()).toBeInTheDocument();
    });
  });

  describe("Initial values", () => {
    test("Makes the `initialTitle` prop the value of the title field", () => {
      const {
        getTitleField,
        props: { initialTitle },
      } = renderComponent();

      expect(getTitleField()).toHaveValue(initialTitle);
    });

    test("Makes the `initialDescription` prop the value of the description field", () => {
      const {
        getDescriptionField,
        props: { initialDescription },
      } = renderComponent();

      expect(getDescriptionField()).toHaveValue(initialDescription);
    });
  });

  describe("When the title field is empty", () => {
    test("Disables the 'Submit' button", () => {
      const { getSubmitButton } = renderComponent({ initialTitle: "" });

      expect(getSubmitButton()).toBeDisabled();
    });
  });

  describe("When the title field contains only spaces", () => {
    test("Disables the 'Submit' button", () => {
      const { getSubmitButton } = renderComponent({ initialTitle: "   " });

      expect(getSubmitButton()).toBeDisabled();
    });
  });

  describe("When the values are correct and the user presses the 'Submit' button", () => {
    test("Invokes the 'onSubmit' prop with the form values", () => {
      const {
        getSubmitButton,
        getDescriptionField,
        getTitleField,
        props: { onSubmit },
      } = renderComponent({ initialDescription: "", initialTitle: "" });

      const newTitle = chance.word();
      userEvent.type(getTitleField(), newTitle);

      const newDescription = chance.sentence();
      userEvent.type(getDescriptionField(), newDescription);

      userEvent.click(getSubmitButton());

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith(newTitle, newDescription);
    });
  });

  describe("When the user click the 'Cancel' button", () => {
    test("The 'onCancel' prop is called", () => {
      const {
        getCancelButton,
        props: { onCancel },
      } = renderComponent();

      userEvent.click(getCancelButton());

      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });
});
