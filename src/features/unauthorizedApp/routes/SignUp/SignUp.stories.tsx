import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import SignUp from "./SignUp";

export default {
  title: "Unauthorized app/SignUp",
  component: SignUp,
} as ComponentMeta<typeof SignUp>;

const Template: ComponentStory<typeof SignUp> = (args) => <SignUp {...args} />;

export const Default = Template.bind({});
