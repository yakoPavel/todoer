import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Home } from "./Home";

import { Modals } from "@/features/authorizedApp/features/Modals";

export default {
  title: "Authorized app/Page/Home",
  component: Home,
} as ComponentMeta<typeof Home>;

const Template: ComponentStory<typeof Home> = (args) => (
  <>
    <Modals />
    <Home {...args} />
  </>
);

export const Default = Template.bind({});
