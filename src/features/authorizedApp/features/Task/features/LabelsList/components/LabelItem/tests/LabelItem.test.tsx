import Chance from "chance";
import React from "react";

import { LabelItem, LabelItemProps } from "../LabelItem";

import { render, screen, userEvent } from "@/test/testUtils";

const SEED = 12345;
const chance = new Chance(SEED);

const renderComponent = (override: Partial<LabelItemProps> = {}) => {
  const props: LabelItemProps = {
    title: chance.word(),
    color: "gold",
    isChecked: false,
    onChange: jest.fn(),
    ...override,
  };

  render(<LabelItem {...props} />);

  const getTitle = () => screen.getByText(props.title);
  const getCheckboxIcon = () => screen.getByTestId("checkboxIcon");
  const getLabelIcon = () => screen.getByTestId("labelIcon");
  const getUncheckedItem = () => screen.getByRole("option", { checked: false });
  const getCheckedItem = () => screen.getByRole("option", { checked: true });

  return {
    props,
    getTitle,
    getCheckboxIcon,
    getLabelIcon,
    getUncheckedItem,
    getCheckedItem,
  };
};

describe("The `LabelIcon` component", () => {
  describe("Rendering", () => {
    test("Renders the label icon", () => {
      const { getLabelIcon } = renderComponent();

      expect(getLabelIcon()).toBeInTheDocument();
    });

    test("Render the title", () => {
      const { getTitle } = renderComponent();

      expect(getTitle()).toBeInTheDocument();
    });

    test("Renders the checkbox icon", () => {
      const { getCheckboxIcon } = renderComponent();

      expect(getCheckboxIcon()).toBeInTheDocument();
    });
  });

  describe("When the `isChecked` props is false", () => {
    test("The item is unchecked", () => {
      const { getUncheckedItem } = renderComponent();

      expect(getUncheckedItem()).toBeInTheDocument();
    });

    describe("When the user click on the item", () => {
      test("The 'onChange' prop is invoke with `true` as an argument", () => {
        const { getUncheckedItem, props } = renderComponent();

        userEvent.click(getUncheckedItem());

        expect(props.onChange).toHaveBeenCalledTimes(1);
        expect(props.onChange).toHaveBeenCalledWith(true);
      });
    });
  });

  describe("When the `isChecked` props is true", () => {
    test("The item is checked", () => {
      const { getCheckedItem } = renderComponent({ isChecked: true });

      expect(getCheckedItem()).toBeInTheDocument();
    });

    describe("When the user click on the item", () => {
      test("The 'onChange' prop is invoke with `false` as an argument", () => {
        const { getCheckedItem, props } = renderComponent({ isChecked: true });

        userEvent.click(getCheckedItem());

        expect(props.onChange).toHaveBeenCalledTimes(1);
        expect(props.onChange).toHaveBeenCalledWith(false);
      });
    });
  });
});
