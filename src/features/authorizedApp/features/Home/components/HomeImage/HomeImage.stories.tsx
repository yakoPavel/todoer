import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { HomeImage } from "./HomeImage";

import { themeSwitcherArgType } from "@/storybook/commonArgTypes";

export default {
  title: "Authorized app/Home/HomeImage",
  component: HomeImage,
  argTypes: {
    ...themeSwitcherArgType,
  },
} as ComponentMeta<typeof HomeImage>;

const Template: ComponentStory<typeof HomeImage> = (args) => (
  <HomeImage {...args} />
);

export const Day = Template.bind({});
Day.args = {
  type: "day",
};

export const Night = Template.bind({});
Night.args = {
  type: "night",
};
