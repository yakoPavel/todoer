import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { AppHeader } from "./AppHeader";

export default {
  title: "Authorized app/AppHeader",
  component: AppHeader,
} as ComponentMeta<typeof AppHeader>;

const Template: ComponentStory<typeof AppHeader> = (args) => (
  <AppHeader {...args} />
);

export const Default = Template.bind({});
