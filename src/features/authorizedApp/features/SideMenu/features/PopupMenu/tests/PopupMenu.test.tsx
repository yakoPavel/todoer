import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  userEvent,
  within,
} from "test/testUtils";

import withPopupMenu from "../hoc/withPopupMenu";
import * as dataMocks from "./utils/dataMocks";

function renderComponent(showOn: "click" | "contextmenu") {
  const onClickHandler = jest.fn();

  const Component = withPopupMenu({
    Component: dataMocks.TriggerComponent,
    popupMenuConfig: {
      menuItems: dataMocks.menuItems,
      onClick: onClickHandler,
    },
    showOn,
  });

  render(
    <div id="root">
      <Component />
    </div>,
  );

  return {
    triggerComponent: screen.getByText(/trigger/i),
    menuItemsData: dataMocks.menuItems,
    onClickHandler,
  };
}

function checkThePopupAndItsContent(menuItemsData: typeof dataMocks.menuItems) {
  const popupMenu = screen.getByRole("menu");
  expect(within(popupMenu).getAllByRole("menuitem")).toHaveLength(
    menuItemsData.length,
  );
  menuItemsData.forEach((itemData) =>
    expect(within(popupMenu).getByText(RegExp(itemData.text, "i"))),
  );
}

function renderAndTriggerThePopup(by: "click" | "contextmenu") {
  let renderingData: ReturnType<typeof renderComponent>;

  if (by === "click") {
    renderingData = renderComponent("click");
    act(() => userEvent.click(renderingData.triggerComponent));
  } else {
    renderingData = renderComponent("contextmenu");
    act(() => {
      fireEvent.contextMenu(renderingData.triggerComponent);
    });
  }

  return renderingData;
}

test("renders the popup menu and all its items when triggered by a click", () => {
  const { menuItemsData } = renderAndTriggerThePopup("click");

  expect(() => checkThePopupAndItsContent(menuItemsData)).not.toThrow();
});

test("renders the popup menu and all its items when triggered as a context menu", () => {
  const { menuItemsData } = renderAndTriggerThePopup("contextmenu");

  expect(() => checkThePopupAndItsContent(menuItemsData)).not.toThrow();
});

test("correctly invokes the specified callback when the popup's item is clicked and then hides the popup", async () => {
  const { onClickHandler } = renderAndTriggerThePopup("click");

  const menuItems = screen.getAllByRole("menuitem");
  const firstMenuItem = menuItems[0];
  act(() => userEvent.click(firstMenuItem));

  expect(onClickHandler).toHaveBeenCalledWith(firstMenuItem.textContent);

  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
});
