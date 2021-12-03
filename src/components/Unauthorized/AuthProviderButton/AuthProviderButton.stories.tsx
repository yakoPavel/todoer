import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import AuthProviderButton from "./AuthProviderButton";

export default {
  title: "Unauthorized app/AuthProviderButton",
  component: AuthProviderButton,
} as ComponentMeta<typeof AuthProviderButton>;

const Template: ComponentStory<typeof AuthProviderButton> = (args) => (
  <div
    style={{
      width: "30vw",
      height: "100vh",
      margin: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <AuthProviderButton {...args} />
  </div>
);

export const AppleButton = Template.bind({});
AppleButton.args = {
  variant: "apple",
};

export const FacebookButton = Template.bind({});
FacebookButton.args = {
  variant: "facebook",
};

export const GoogleButton = Template.bind({});
GoogleButton.args = {
  variant: "google",
};
