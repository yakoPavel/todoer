import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Button } from "./Button";

export default {
  title: "UI/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Button text</Button>
);

export const Primary = Template.bind({});

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
  disabled: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
};

export const SecondaryDisabled = Template.bind({});
SecondaryDisabled.args = {
  variant: "secondary",
  disabled: true,
};
