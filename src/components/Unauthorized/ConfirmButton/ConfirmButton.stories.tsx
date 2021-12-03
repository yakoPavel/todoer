import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import ConfirmButton from "./ConfirmButton";

export default {
  title: "Unauthorized app/ConfirmButton",
  component: ConfirmButton,
} as ComponentMeta<typeof ConfirmButton>;

const Template: ComponentStory<typeof ConfirmButton> = (args) => (
  <div
    style={{
      width: "50vw",
      height: "100vh",
      margin: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <ConfirmButton {...args}>Button</ConfirmButton>
  </div>
);

export const Default = Template.bind({});
