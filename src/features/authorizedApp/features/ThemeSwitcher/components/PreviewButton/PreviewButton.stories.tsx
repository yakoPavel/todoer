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
  themeName: "sunflower",
};

export const Orange = Template.bind({});
Orange.args = {
  themeName: "orange",
};

export const Clover = Template.bind({});
Clover.args = {
  themeName: "clover",
};

export const Amethyst = Template.bind({});
Amethyst.args = {
  themeName: "amethyst",
};

export const Blueberry = Template.bind({});
Blueberry.args = {
  themeName: "blueberry",
};

export const Graphite = Template.bind({});
Graphite.args = {
  themeName: "graphite",
};

export const Pink = Template.bind({});
Pink.args = {
  themeName: "pink",
};

export const RoyalBlue = Template.bind({});
RoyalBlue.args = {
  themeName: "royalBlue",
};

export const Sky = Template.bind({});
Sky.args = {
  themeName: "sky",
};
