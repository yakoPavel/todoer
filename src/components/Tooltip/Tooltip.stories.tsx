import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Tooltip } from "./Tooltip";

export default {
  title: "UI/Tooltip",
  component: Tooltip,
  args: {
    tooltipText: "Sample text",
  },
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <Tooltip {...args}>
    <button type="button" style={{ fontSize: 16 }}>
      Hover me
    </button>
  </Tooltip>
);

export const Default = Template.bind({});

export const WithSingleKeyShortcut = Template.bind({});
WithSingleKeyShortcut.args = {
  shortcut: ["K"],
};
WithSingleKeyShortcut.storyName = "With a single-key shortcut";

export const WithMultipleKeyShortcut = Template.bind({});
WithMultipleKeyShortcut.args = {
  shortcut: ["alt", "shift", "P"],
};
WithMultipleKeyShortcut.storyName = "With a multiple-key shortcut";

export const WithVeryLongText = Template.bind({});
WithVeryLongText.args = {
  tooltipText:
    "Some very very very very very very very very very very very very very very very very long text",
};
WithVeryLongText.storyName = "With a very long text";
