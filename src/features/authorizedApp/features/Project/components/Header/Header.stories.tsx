import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Header } from "./Header";

export default {
  title: "Authorized app/Project/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Header {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  projectTitle: "Project title",
};
