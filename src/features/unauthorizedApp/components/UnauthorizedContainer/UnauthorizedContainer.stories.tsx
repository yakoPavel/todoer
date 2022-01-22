import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { UnauthorizedContainer } from "./UnauthorizedContainer";

export default {
  title: "Unauthorized App/Components/UnauthorizedContainer",
  component: UnauthorizedContainer,
} as ComponentMeta<typeof UnauthorizedContainer>;

const Template: ComponentStory<typeof UnauthorizedContainer> = (args) => (
  <UnauthorizedContainer {...args}>
    <h1>Content</h1>
  </UnauthorizedContainer>
);

export const Default = Template.bind({});
