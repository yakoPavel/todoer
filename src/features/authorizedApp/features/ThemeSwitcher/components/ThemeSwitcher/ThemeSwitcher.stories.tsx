import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ThemeSwitcher } from "./ThemeSwitcher";

export default {
  title: "Authorized app/Modals/ThemeSwitcher",
  component: ThemeSwitcher,
} as ComponentMeta<typeof ThemeSwitcher>;

const Template: ComponentStory<typeof ThemeSwitcher> = (args) => (
  <ThemeSwitcher {...args} />
);

export const Default = Template.bind({});
