import React from "react";

import { Dialog } from "../Dialog/Dialog";

import { render, screen, userEvent } from "@/test/testUtils";
import { UniqueChance } from "@/test/UniqueChance";

const SEED = 12345;
const chance = new UniqueChance(SEED);

function renderComponent() {
  const props = {
    dialogContent: chance.sentence(),
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
    cancelButtonTitle: chance.word(),
    confirmButtonTitle: chance.word(),
  };

  render(<Dialog {...props} />);

  const getDialogElement = () => screen.getByRole("dialog");
  const getCancelButtonElement = () =>
    screen.getByRole("button", { name: props.cancelButtonTitle });
  const getConfirmButtonElement = () =>
    screen.getByRole("button", { name: props.confirmButtonTitle });
  const getDialogContentElement = () => screen.getByText(props.dialogContent);
  const getCloseButtonElement = () =>
    screen.getByRole("button", { name: /close/i });

  return {
    ...props,
    getDialogContentElement,
    getDialogElement,
    getCancelButtonElement,
    getConfirmButtonElement,
    getCloseButtonElement,
  };
}

describe("The `Dialog` component", () => {
  describe("Rendering", () => {
    test("Renders a dialog", () => {
      const { getDialogElement } = renderComponent();

      expect(getDialogElement()).toBeInTheDocument();
    });

    test("Renders dialog content", () => {
      const { getDialogContentElement } = renderComponent();

      expect(getDialogContentElement()).toBeInTheDocument();
    });

    test("Renders control buttons", () => {
      const { getCancelButtonElement, getConfirmButtonElement } =
        renderComponent();

      expect(getCancelButtonElement()).toBeInTheDocument();
      expect(getConfirmButtonElement()).toBeInTheDocument();
    });

    test("Render a close dialog button", () => {
      const { getCloseButtonElement } = renderComponent();

      expect(getCloseButtonElement()).toBeInTheDocument();
    });
  });

  describe("When the cancel button is pressed", () => {
    test("Invokes the 'onCancel' callback", () => {
      const { getCancelButtonElement, onCancel } = renderComponent();

      const cancelButton = getCancelButtonElement();
      userEvent.click(cancelButton);

      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe("When the close dialog button is pressed", () => {
    test("Invokes the 'onCancel' callback", () => {
      const { getCloseButtonElement, onCancel } = renderComponent();

      const closeButton = getCloseButtonElement();
      userEvent.click(closeButton);

      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe("When the confirm button is pressed", () => {
    test("Invokes the 'onConfirm' callback", () => {
      const { getConfirmButtonElement, onConfirm } = renderComponent();

      const confirmButton = getConfirmButtonElement();
      userEvent.click(confirmButton);

      expect(onConfirm).toHaveBeenCalledTimes(1);
    });
  });
});
