import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import * as AuthPasswordInput from "./AuthPasswordInput";

export default {
  title: "Unauthorized app/Components/PasswordInput",
  component: AuthPasswordInput.AuthPasswordInputWrapper,
} as ComponentMeta<typeof AuthPasswordInput.AuthPasswordInputWrapper>;

const Template: ComponentStory<
  typeof AuthPasswordInput.AuthPasswordInputWrapper
> = (args) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      width: "50%",
      margin: "auto",
    }}
  >
    <AuthPasswordInput.AuthPasswordInputWrapper {...args}>
      <AuthPasswordInput.AuthPasswordInputLabel htmlFor="password">
        Password
      </AuthPasswordInput.AuthPasswordInputLabel>
      <AuthPasswordInput.AuthPasswordInputField id="password" />
    </AuthPasswordInput.AuthPasswordInputWrapper>
  </div>
);

export const Default = Template.bind({});
