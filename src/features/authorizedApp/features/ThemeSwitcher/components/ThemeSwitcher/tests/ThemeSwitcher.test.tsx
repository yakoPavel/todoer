import React from "react";

import { ThemeSwitcher } from "../ThemeSwitcher";

import * as themes from "@/style/colors";
import { render, screen, userEvent, within } from "@/test/testUtils";

const themeNames = Object.keys(themes).map((themeName) =>
  themeName.replace("Theme", ""),
);

describe("The `ThemeSwitcher` component", () => {
  test("Renders buttons for all the themes", () => {
    render(<ThemeSwitcher />);

    const themeButtons = screen.getAllByRole("radio");
    expect(themeButtons).toHaveLength(themeNames.length);

    themeNames.forEach((themeName) => {
      expect(
        screen.getByRole("radio", { name: themeName }),
      ).toBeInTheDocument();
    });
  });

  describe("When a button is clicked", () => {
    test("Marks the theme as checked", () => {
      render(<ThemeSwitcher />);

      const secondButton = screen.getAllByRole("radio")[1];
      userEvent.click(secondButton);

      expect(secondButton).toBeChecked();
    });

    test("Shows a checkmark sign inside this button", () => {
      render(<ThemeSwitcher />);

      const secondButton = screen.getAllByRole("radio")[1];
      userEvent.click(secondButton);

      expect(within(secondButton).getByTestId("checkmark")).toBeInTheDocument();
    });
  });
});
