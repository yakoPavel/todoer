import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { AuthProviderButton } from "./AuthProviderButton";

export default {
  title: "Unauthorized app/Components/AuthProviderButton",
  component: AuthProviderButton,
} as ComponentMeta<typeof AuthProviderButton>;

const Template: ComponentStory<typeof AuthProviderButton> = (args) => (
  <div style={{ width: "30vw" }}>
    <AuthProviderButton {...args} />
  </div>
);

export const YahooButton = Template.bind({});
YahooButton.args = {
  variant: "yahoo",
};
export const YahooButtonLoading = Template.bind({});
YahooButtonLoading.args = {
  ...YahooButton.args,
  isLoading: true,
};
export const YahooButtonDisabled = Template.bind({});
YahooButtonDisabled.args = {
  ...YahooButton.args,
  isDisabled: true,
};

export const FacebookButton = Template.bind({});
FacebookButton.args = {
  variant: "facebook",
};
export const FacebookButtonLoading = Template.bind({});
FacebookButtonLoading.args = {
  ...FacebookButton.args,
  isLoading: true,
};
export const FacebookButtonDisabled = Template.bind({});
FacebookButtonDisabled.args = {
  ...FacebookButton.args,
  isDisabled: true,
};

export const GoogleButton = Template.bind({});
GoogleButton.args = {
  variant: "google",
};
export const GoogleButtonLoading = Template.bind({});
GoogleButtonLoading.args = {
  ...GoogleButton.args,
  isLoading: true,
};
export const GoogleButtonDisabled = Template.bind({});
GoogleButtonDisabled.args = {
  ...GoogleButton.args,
  isDisabled: true,
};
