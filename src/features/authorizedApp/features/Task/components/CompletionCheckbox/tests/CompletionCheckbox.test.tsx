import React from "react";

import { CompletionCheckbox } from "../CompletionCheckbox";

import { render, screen, userEvent } from "@/test/testUtils";

type RenderComponentOptions = {
  isChecked?: boolean;
};

function renderComponent({ isChecked = false }: RenderComponentOptions = {}) {
  const onChange = jest.fn();

  render(<CompletionCheckbox onChange={onChange} isChecked={isChecked} />);

  const getCheckbox = () => screen.getByRole("checkbox");

  return {
    onChange,
    getCheckbox,
  };
}

describe("The `CompletionCheckbox` component", () => {
  test("Renders the checkbox on the screen", () => {
    const { getCheckbox } = renderComponent();

    expect(getCheckbox()).toBeInTheDocument();
  });

  describe("When the component is in the unchecked state", () => {
    test("Renders a component that isn't checked", () => {
      const { getCheckbox } = renderComponent({ isChecked: false });

      expect(getCheckbox()).not.toBeChecked();
    });

    test("When the user clicks the checkbox, invokes the 'onChange' callback with `true` as an argument", () => {
      const { getCheckbox, onChange } = renderComponent({ isChecked: false });

      const checkbox = getCheckbox();
      userEvent.click(checkbox);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(true);
    });
  });

  describe("When the component is in the checked state", () => {
    test("Renders a component that is checked", () => {
      const { getCheckbox } = renderComponent({ isChecked: true });

      expect(getCheckbox()).toBeChecked();
    });

    test("When the user clicks the checkbox, invokes the 'onChange' callback with `false` as an argument", () => {
      const { getCheckbox, onChange } = renderComponent({ isChecked: true });

      const checkbox = getCheckbox();
      userEvent.click(checkbox);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(false);
    });
  });
});
