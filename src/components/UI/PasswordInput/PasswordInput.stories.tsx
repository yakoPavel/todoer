import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import * as PasswordInput from "./PasswordInput";

export default {
  title: "UI/PasswordInput",
  component: PasswordInput.PasswordInputWrapper,
} as ComponentMeta<typeof PasswordInput.PasswordInputWrapper>;

const Template: ComponentStory<typeof PasswordInput.PasswordInputWrapper> = (
  args,
) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      width: "50%",
      margin: "auto",
    }}
  >
    <PasswordInput.PasswordInputWrapper {...args}>
      <PasswordInput.PasswordInputLabel htmlFor="password">
        Password
      </PasswordInput.PasswordInputLabel>
      <PasswordInput.PasswordInputField id="password" />
    </PasswordInput.PasswordInputWrapper>
  </div>
);

export const Default = Template.bind({});
