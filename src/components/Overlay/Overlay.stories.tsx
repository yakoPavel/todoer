import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Overlay from "./Overlay";

export default {
  title: "Ui/Overlay",
  component: Overlay,
} as ComponentMeta<typeof Overlay>;

const Template: ComponentStory<typeof Overlay> = (args) => (
  <Overlay {...args}>
    <div style={{ color: "#fff" }}>Content</div>
  </Overlay>
);

export const Default = Template.bind({});
