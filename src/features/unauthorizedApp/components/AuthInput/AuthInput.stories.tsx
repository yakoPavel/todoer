import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import * as AuthInput from "./AuthInput";

export default {
  title: "Unauthorized app/Components/AuthInput",
  component: AuthInput.AuthInputWrapper,
} as ComponentMeta<typeof AuthInput.AuthInputWrapper>;

const Template: ComponentStory<typeof AuthInput.AuthInputWrapper> = (args) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      width: "50%",
      margin: "auto",
    }}
  >
    <AuthInput.AuthInputWrapper {...args}>
      <AuthInput.AuthInputLabel>Label</AuthInput.AuthInputLabel>
      <AuthInput.AuthInputField />
    </AuthInput.AuthInputWrapper>
  </div>
);

export const Default = Template.bind({});
