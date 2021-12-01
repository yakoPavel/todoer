import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Link from "./Link";

export default {
  title: "UI/Link",
  component: Link,
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => (
  <Link {...args} href="https://google.com">
    Go to Google
  </Link>
);

export const Default = Template.bind({});
