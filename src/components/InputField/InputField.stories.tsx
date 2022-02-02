import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { InputField } from "./InputField";

export default {
  title: "UI/`InputField",
  component: InputField,
} as ComponentMeta<typeof InputField>;

const Template: ComponentStory<typeof InputField> = (args) => (
  <InputField {...args} />
);

export const Default = Template.bind({});
