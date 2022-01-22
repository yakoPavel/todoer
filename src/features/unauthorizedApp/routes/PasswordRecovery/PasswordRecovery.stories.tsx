import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { PasswordRecovery } from "./PasswordRecovery";

export default {
  title: "Unauthorized app/PasswordRecovery",
  component: PasswordRecovery,
} as ComponentMeta<typeof PasswordRecovery>;

const Template: ComponentStory<typeof PasswordRecovery> = (args) => (
  <PasswordRecovery {...args} />
);

export const Default = Template.bind({});
