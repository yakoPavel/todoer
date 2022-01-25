import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { BsThreeDots } from "react-icons/bs";

import { MenuSection } from "./MenuSection";

import { themeSwitcherArgType } from "@/storybook/commonArgTypes";

export default {
  title: "Authorized app/SideMenu/MenuSection",
  component: MenuSection,
  argTypes: {
    ...themeSwitcherArgType,
  },
} as ComponentMeta<typeof MenuSection>;

const Template: ComponentStory<typeof MenuSection> = (args) => (
  <div style={{ width: 300 }}>
    <MenuSection {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  sectionTitle: "Favorites",
  sectionContent: "content",
};

export const WithRightSlot = Template.bind({});
WithRightSlot.args = {
  ...Default.args,
  rightSlot: <BsThreeDots />,
};
WithRightSlot.storyName = "With right slot";
