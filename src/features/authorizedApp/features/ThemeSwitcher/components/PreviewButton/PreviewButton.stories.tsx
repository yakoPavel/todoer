import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { PreviewButton } from "./PreviewButton";

export default {
  title: "Authorized app/Modals/ThemeSwitcher/PreviewButton",
  component: PreviewButton,
} as ComponentMeta<typeof PreviewButton>;

const Template: ComponentStory<typeof PreviewButton> = (args) => (
  <PreviewButton {...args} />
);

export const Light = Template.bind({});
Light.args = {
  themeName: "light",
};

export const Dark = Template.bind({});
Dark.args = {
  themeName: "dark",
};

export const Noir = Template.bind({});
Noir.args = {
  themeName: "noir",
};

export const Neutral = Template.bind({});
Neutral.args = {
  themeName: "neutral",
};

export const Orange = Template.bind({});
Orange.args = {
  themeName: "orange",
};
