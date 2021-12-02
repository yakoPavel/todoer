import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import * as LoginInput from "./LoginInput";

export default {
  title: "UI/Input",
  component: LoginInput.LoginInputWrapper,
} as ComponentMeta<typeof LoginInput.LoginInputWrapper>;

const Template: ComponentStory<typeof LoginInput.LoginInputWrapper> = (
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
    <LoginInput.LoginInputWrapper {...args}>
      <LoginInput.LoginInputLabel>Label</LoginInput.LoginInputLabel>
      <LoginInput.LoginInputFiled />
    </LoginInput.LoginInputWrapper>
  </div>
);

export const Default = Template.bind({});
