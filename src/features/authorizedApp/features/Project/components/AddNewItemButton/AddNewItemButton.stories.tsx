import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { AddNewItemButton } from "./AddNewItemButton";

import { themeSwitcherArgType } from "@/storybook/commonArgTypes";

export default {
  title: "Authorized app/Project/AddNewItemButton",
  component: AddNewItemButton,
  argTypes: {
    ...themeSwitcherArgType,
  },
} as ComponentMeta<typeof AddNewItemButton>;

const Template: ComponentStory<typeof AddNewItemButton> = (args) => (
  <div style={{ width: "50%" }}>
    <AddNewItemButton {...args} />
  </div>
);

export const Default = Template.bind({});
