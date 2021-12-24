import { ComponentMeta, Story } from "@storybook/react";
import React from "react";
import { themeSwitcherArgType } from "storybook/commonArgTypes";

import withPopupMenu from "../hoc/withPopupMenu";
import * as dataMocks from "../test/dataMocks";
import PopupMenu, { PopupMenuProps } from "./PopupMenu";

const popupMenuConfig: PopupMenuProps = {
  menuItems: dataMocks.menuItems,
  onClick: (id: string) => {
    // eslint-disable-next-line no-console
    console.log(`${id} was clicked`);
  },
};

const ComponentWithPopupMenuShownOnClick = withPopupMenu({
  Component: dataMocks.TriggerComponent,
  popupMenuConfig,
  showOn: "click",
});
const ComponentWithPopupMenuShownOnContextMenu = withPopupMenu({
  Component: dataMocks.TriggerComponent,
  popupMenuConfig,
  showOn: "contextmenu",
});

export default {
  title: "Authorized app/SideMenu/PopupMenu",
  component: PopupMenu,
  argTypes: {
    ...themeSwitcherArgType,
  },
} as ComponentMeta<typeof PopupMenu>;

const Template: Story<PopupMenuProps & { showOn: "click" | "contextmenu" }> = ({
  showOn,
}) => {
  if (showOn === "click") return <ComponentWithPopupMenuShownOnClick />;
  return <ComponentWithPopupMenuShownOnContextMenu />;
};

export const TriggerByClick = Template.bind({});
TriggerByClick.args = {
  showOn: "click",
};
TriggerByClick.storyName = "Triggering on click";

export const TriggerByContextMenu = Template.bind({});
TriggerByContextMenu.args = {
  showOn: "contextmenu",
};
TriggerByContextMenu.storyName = "Triggering on contextmenu";
