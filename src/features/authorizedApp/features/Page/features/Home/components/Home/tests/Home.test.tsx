import React from "react";
import { MemoryRouter } from "react-router-dom";

import { Home } from "../Home";

import { Modals } from "@/features/authorizedApp/features/Modals";
import { actions as modalsUiActions } from "@/features/authorizedApp/store/slices/modalsUi";
import { store } from "@/features/authorizedApp/store/store";
import { render, screen, userEvent } from "@/test/testUtils";

jest.mock("@/context/UserContext");

beforeEach(() => {
  store.dispatch(modalsUiActions.reset());
});

const componentGetters = {
  getHomeImage() {
    return screen.getByTestId(/^homeImage/);
  },
  getHomeImageDay() {
    return screen.getByTestId("homeImageDay");
  },
  getHomeImageNight() {
    return screen.getByTestId("homeImageNight");
  },
  getGreeting() {
    return screen.getByText(/^good .+!/i);
  },
  getGreetingWithTimeOfDay(timeOfDay: string) {
    return screen.getByText(RegExp(`^good${timeOfDay}!`, "i"));
  },
  getAddProjectButton() {
    return screen.getByRole("button", { name: /add project/i });
  },
  getAddLabelButton() {
    return screen.getByRole("button", { name: /add label/i });
  },
  getAddLabelForm() {
    return screen.getByTestId("addLabelForm");
  },
  getAddProjectForm() {
    return screen.getByTestId("addProjectForm");
  },
};

function renderComponent() {
  render(
    <>
      <MemoryRouter>
        <Modals />
        <Home />
      </MemoryRouter>
    </>,
  );
}

describe("The `Home` component", () => {
  describe("Rendering", () => {
    test("Renders the image", () => {
      renderComponent();

      const { getHomeImage } = componentGetters;

      expect(getHomeImage()).toBeInTheDocument();
    });

    test("Renders the greeting", () => {
      renderComponent();

      const { getGreeting } = componentGetters;

      expect(getGreeting()).toBeInTheDocument();
    });

    test("Renders the 'Add project' button", () => {
      renderComponent();

      const { getAddProjectButton } = componentGetters;

      expect(getAddProjectButton()).toBeInTheDocument();
    });

    test("Renders the 'Add label' button", () => {
      renderComponent();

      const { getAddLabelButton } = componentGetters;

      expect(getAddLabelButton()).toBeInTheDocument();
    });
  });

  describe("When the 'Add project' button is clicked", () => {
    test("Shows the 'Add project' form", () => {
      renderComponent();

      const { getAddProjectButton, getAddProjectForm } = componentGetters;

      userEvent.click(getAddProjectButton());

      expect(getAddProjectForm()).toBeInTheDocument();
    });
  });

  describe("When the 'Add label' button is clicked", () => {
    test("Shows the 'Add label' form", () => {
      renderComponent();

      const { getAddLabelButton, getAddLabelForm } = componentGetters;

      userEvent.click(getAddLabelButton());

      expect(getAddLabelForm()).toBeInTheDocument();
    });
  });
});
