/* eslint-disable no-console */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { themeSwitcherArgType } from "storybook/commonArgTypes";

import Form from "./Form";

export default {
  title: "Authorized app/Modals/Form",
  component: Form,
  argTypes: {
    ...themeSwitcherArgType,
  },
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

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
