import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ErrorScreen } from "./ErrorScreen";

export default {
  title: "Authorized app/UI/ErrorScreen",
  component: ErrorScreen,
} as ComponentMeta<typeof ErrorScreen>;

const Template: ComponentStory<typeof ErrorScreen> = (args) => (
  <ErrorScreen {...args} />
);

export const Default = Template.bind({});
