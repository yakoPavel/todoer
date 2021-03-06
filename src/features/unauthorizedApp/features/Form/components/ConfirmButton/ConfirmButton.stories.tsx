import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ConfirmButton } from "./ConfirmButton";

export default {
  title: "Unauthorized app/Components/ConfirmButton",
  component: ConfirmButton,
} as ComponentMeta<typeof ConfirmButton>;

const Template: ComponentStory<typeof ConfirmButton> = (args) => (
  <div style={{ width: "50vw" }}>
    <ConfirmButton {...args}>Button</ConfirmButton>
  </div>
);

export const Default = Template.bind({});

export const LoadingState = Template.bind({});
LoadingState.args = {
  isLoading: true,
};
