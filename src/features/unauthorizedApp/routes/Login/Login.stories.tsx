import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Login from "./Login";

export default {
  title: "Unauthorized app/Login",
  component: Login,
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = (args) => <Login {...args} />;

export const Default = Template.bind({});
