import React from "react";

import { AppHeader } from "../AppHeader";

import { render, screen } from "@/test/testUtils";

jest.mock("@/context/UserContext");

function renderComponent() {
  render(
    <AppHeader
      isSideMenuOpened={false}
      onGoHome={jest.fn()}
      onLogout={jest.fn()}
      onMenuToggle={jest.fn()}
      onThemeChange={jest.fn()}
    />,
  );

  const getToggleMenuButton = () =>
    screen.getByRole("button", { name: /open the menu/i });
  const getGoHomeButton = () =>
    screen.getByRole("button", { name: /open the menu/i });
  const getChangeThemeButton = () =>
    screen.getByRole("button", { name: /change the theme/i });
  const getLogoutButton = () => screen.getByRole("button", { name: /logout/i });
  const getSearch = () => screen.getByRole("search");

  return {
    getToggleMenuButton,
    getGoHomeButton,
    getChangeThemeButton,
    getLogoutButton,
    getSearch,
  };
}

describe("The `AppHeader` component", () => {
  describe("Rendering", () => {
    test("Renders the 'Toggle menu' button", () => {
      const { getToggleMenuButton } = renderComponent();

      expect(getToggleMenuButton()).toBeInTheDocument();
    });

    test("Renders the 'Go home' button", () => {
      const { getGoHomeButton } = renderComponent();

      expect(getGoHomeButton()).toBeInTheDocument();
    });

    test("Renders the 'Change theme' button", () => {
      const { getChangeThemeButton } = renderComponent();

      expect(getChangeThemeButton()).toBeInTheDocument();
    });

    test("Renders the 'Logout' button", () => {
      const { getLogoutButton } = renderComponent();

      expect(getLogoutButton()).toBeInTheDocument();
    });

    test("Renders the search", () => {
      const { getSearch } = renderComponent();

      expect(getSearch()).toBeInTheDocument();
    });
  });
});
