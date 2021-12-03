import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import StyledLink from "./StyledLink";

export default {
  title: "UI/StyledLink",
  component: StyledLink,
} as ComponentMeta<typeof StyledLink>;

const Template: ComponentStory<typeof StyledLink> = (args) => (
  <StyledLink {...args} href="https://google.com">
    Go to Google
  </StyledLink>
);

export const Default = Template.bind({});
