import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import * as AuthPasswordInput from "./AuthPasswordInput";

export default {
  title: "Unauthorized app/Components/AuthPasswordInput",
  component: AuthPasswordInput.AuthPasswordInputWrapper,
} as ComponentMeta<typeof AuthPasswordInput.AuthPasswordInputWrapper>;

const Template: ComponentStory<
  typeof AuthPasswordInput.AuthPasswordInputWrapper
> = (args) => (
  <AuthPasswordInput.AuthPasswordInputWrapper {...args}>
    <AuthPasswordInput.AuthPasswordInputLabel htmlFor="password">
      Password
    </AuthPasswordInput.AuthPasswordInputLabel>
    <AuthPasswordInput.AuthPasswordInputField id="password" />
  </AuthPasswordInput.AuthPasswordInputWrapper>
);

export const Default = Template.bind({});
