import React from "react";

import { ErrorScreen, ErrorScreenProps } from "../ErrorScreen";

import { screen, render } from "@/test/testUtils";

function renderComponent(overrides: ErrorScreenProps = {}) {
  const props: ErrorScreenProps = {
    detectOffline: true,
    message: "Oops, something went wrong",
  };
  render(<ErrorScreen {...overrides} />);

  const getMessage = () => screen.getByText(props.message as string);
  const getOfflineMessage = () => screen.getByText(/offline/i);
  const getIcon = () => screen.getByTestId("errorIcon");

  return {
    props,
    getMessage,
    getOfflineMessage,
    getIcon,
  };
}

describe("The `ErrorScreen` component", () => {
  describe("When the browser is offline and `detectOffline` is true", () => {
    beforeAll(() => {
      jest.spyOn(global.navigator, "onLine", "get").mockReturnValue(false);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    test("Shows the 'offline' message", () => {
      const { getOfflineMessage } = renderComponent({ detectOffline: true });

      expect(getOfflineMessage()).toBeInTheDocument();
    });

    test("Shows an icon", () => {
      const { getIcon } = renderComponent({ detectOffline: true });

      expect(getIcon()).toBeInTheDocument();
    });
  });

  describe("When the browser is online", () => {
    test("Shows the 'online' message", () => {
      const { getMessage } = renderComponent({ detectOffline: true });

      expect(getMessage()).toBeInTheDocument();
    });

    test("Shows an icon", () => {
      const { getIcon } = renderComponent({ detectOffline: true });

      expect(getIcon()).toBeInTheDocument();
    });
  });
});
