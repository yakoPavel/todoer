import { ComponentMeta, Story } from "@storybook/react";
import React from "react";

import * as dataMocks from "../tests/utils/dataMocks";
import { ComponentWithPopup } from "../tests/utils/dataMocks";

import { PopupMenuProps, PopupMenu } from "./PopupMenu";

import { themeSwitcherArgType } from "@/storybook/commonArgTypes";

const popupMenuConfig: PopupMenuProps = {
  menuItems: dataMocks.menuItems,
  onClick: (id: string) => {
    // eslint-disable-next-line no-console
    console.log(`${id} was clicked`);
  },
};

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
  return (
    <ComponentWithPopup showOn={showOn} popupMenuConfig={popupMenuConfig} />
  );
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
