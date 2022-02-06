import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { LabelItem } from "./LabelItem";

export default {
  title: "Authorized app/Task/LabelsList/LabelItem",
  component: LabelItem,
} as ComponentMeta<typeof LabelItem>;

const Template: ComponentStory<typeof LabelItem> = (args) => (
  <div style={{ width: "50%" }}>
    <LabelItem {...args} />
  </div>
);

export const Checked = Template.bind({});
Checked.args = {
  color: "gold",
  isChecked: true,
  title: "Checked label",
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  color: "gold",
  isChecked: false,
  title: "Unchecked label",
};
