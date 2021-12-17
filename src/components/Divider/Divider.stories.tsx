import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Divider from "./Divider";

export default {
  title: "UI/Divider",
  component: Divider,
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = (args) => (
  <div style={{ fontSize: 16 }}>
    <p>Some content that needs to be separated from the next one</p>
    <Divider {...args} />
    <p>Some content that needs to be separated from the previous one</p>
  </div>
);

export const Default = Template.bind({});

export const WithText = Template.bind({});
WithText.args = {
  inBetweenText: "Some text",
};
WithText.storyName = "With text";
