import { Text } from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { BackgroundButton } from "./BackgroundButton";

export default {
  title: "Authorized app/Project/BackgroundButton",
  component: BackgroundButton,
} as ComponentMeta<typeof BackgroundButton>;

const Template: ComponentStory<typeof BackgroundButton> = (args) => (
  <BackgroundButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: <Text fontSize="xl">Button</Text>,
};
