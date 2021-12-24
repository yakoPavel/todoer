import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { themeSwitcherArgType } from "storybook/commonArgTypes";

import MenuLink from "./MenuLink";

export default {
  title: "Authorized app/SideMenu/MenuLink",
  component: MenuLink,
  argTypes: {
    ...themeSwitcherArgType,
  },
} as ComponentMeta<typeof MenuLink>;

const Template: ComponentStory<typeof MenuLink> = (args) => (
  <div style={{ width: 250 }}>
    <MenuLink {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  text: "Link",
  href: "#",
};

export const WithRightSlot = Template.bind({});
WithRightSlot.args = {
  ...Default.args,
  rightSlot: <AiFillCheckCircle />,
};

export const WithLeftSlot = Template.bind({});
WithLeftSlot.args = {
  ...Default.args,
  leftSlot: <BsThreeDots />,
};

export const WithAllSlots = Template.bind({});
WithAllSlots.args = {
  ...Default.args,
  leftSlot: <BsThreeDots />,
  rightSlot: <AiFillCheckCircle />,
};
