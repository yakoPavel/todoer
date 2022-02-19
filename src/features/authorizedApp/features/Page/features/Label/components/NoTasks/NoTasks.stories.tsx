import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { NoTasks } from "./NoTasks";

export default {
  title: "Authorized app/Page/NoTasks",
  component: NoTasks,
} as ComponentMeta<typeof NoTasks>;

const Template: ComponentStory<typeof NoTasks> = (args) => (
  <NoTasks {...args} />
);

export const Default = Template.bind({});
