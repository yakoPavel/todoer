/* eslint-disable no-console */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { themeSwitcherArgType } from "storybook/commonArgTypes";

import ModalForm from "./ModalForm";

export default {
  title: "Authorized app/ModalForm",
  component: ModalForm,
  argTypes: {
    ...themeSwitcherArgType,
  },
} as ComponentMeta<typeof ModalForm>;

const Template: ComponentStory<typeof ModalForm> = (args) => (
  <ModalForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Title",
  formFieldsConfig: [
    {
      label: "Name",
      type: "text",
      required: true,
    },
    {
      label: "Color",
      type: "color",
    },
    {
      label: "Add to list",
      type: "switch",
    },
  ],
  onSubmit: (values) => console.log(values),
};
