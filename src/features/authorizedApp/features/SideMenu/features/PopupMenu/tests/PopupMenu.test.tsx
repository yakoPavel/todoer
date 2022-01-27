/* eslint-disable jest/expect-expect */
import React from "react";

import * as dataMocks from "./utils/dataMocks";

import {
  act,
  fireEvent,
  render,
  screen,
  userEvent,
  within,
} from "@/test/testUtils";

function renderComponent(showOn: "click" | "contextmenu", disabled = false) {
  const onClickHandler = jest.fn();

  const popupMenuConfig = {
    menuItems: dataMocks.menuItems,
    onClick: onClickHandler,
    disabled,
  };

  render(
    <div id="root">
      <dataMocks.ComponentWithPopup
        popupMenuConfig={popupMenuConfig}
        showOn={showOn}
      />
    </div>,
  );

  return {
    triggerElement: screen.getByText(/trigger/i),
    menuItemsData: dataMocks.menuItems,
    onClickHandler,
  };
}

/**
 * Checks if the popup menu and its content in the document.
 */
function checkThePopupAndItsContent(menuItemsData: typeof dataMocks.menuItems) {
  const popupMenu = screen.getByRole("menu");
  expect(within(popupMenu).getAllByRole("menuitem")).toHaveLength(
    menuItemsData.length,
  );
  menuItemsData.forEach((itemData) =>
    expect(within(popupMenu).getByText(RegExp(itemData.text, "i"))),
  );
}

describe("Popup menu", () => {
  describe("When the trigger component is clicked", () => {
    test("When the popup `showOn` prop is the 'click', shows the popup menu", () => {
      const { triggerElement } = renderComponent("click");

      act(() => userEvent.click(triggerElement));

      checkThePopupAndItsContent(dataMocks.menuItems);
    });

    test("When the popup `showOn` prop is the 'contextmenu', doesn't show the popup menu", () => {
      const { triggerElement } = renderComponent("contextmenu");

      act(() => userEvent.click(triggerElement));

      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  describe("When the user triggers a context menu on the trigger element", () => {
    test("When the popup `showOn` prop is the 'contextmenu', shows the popup menu", () => {
      const { triggerElement } = renderComponent("contextmenu");

      act(() => {
        fireEvent.contextMenu(triggerElement);
      });

      checkThePopupAndItsContent(dataMocks.menuItems);
    });

    test("When the popup `showOn` prop is the 'click', doesn't show the popup menu", () => {
      const { triggerElement } = renderComponent("click");

      act(() => {
        fireEvent.contextMenu(triggerElement);
      });

      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  describe("When a popup menu item is clicked", () => {
    test("Invokes the passed callback with the correct id", () => {
      const { onClickHandler, triggerElement } = renderComponent("click");

      act(() => userEvent.click(triggerElement));
      const menuItems = screen.getAllByRole("menuitem");
      const firstMenuItem = menuItems[0];
      act(() => userEvent.click(firstMenuItem));

      expect(onClickHandler).toHaveBeenCalledTimes(1);
      expect(onClickHandler).toHaveBeenCalledWith(
        firstMenuItem.textContent?.replace(/\s+/g, "_").toUpperCase(),
      );
    });

    test("Hides the popup menu", () => {
      const { triggerElement } = renderComponent("click");

      act(() => userEvent.click(triggerElement));
      act(() => userEvent.click(screen.getAllByRole("menuitem")[0]));

      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });
});
