import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { themeSwitcherArgType } from "storybook/commonArgTypes";

import Dialog from "./Dialog";

export default {
  title: "Authorized app/Modals/Dialog",
  component: Dialog,
  argTypes: {
    ...themeSwitcherArgType,
  },
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => <Dialog {...args} />;

export const Default = Template.bind({});
Default.args = {
  dialogContent: "Content of the dialog",
};

export const WithWideContent = Template.bind({});
WithWideContent.args = {
  dialogContent:
    "Very very very very very very very very very very very very very very very very very long string.",
};