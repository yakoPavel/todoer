import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { PageHeader } from "./PageHeader";

export default {
  title: "Authorized app/Page/PageHeader",
  component: PageHeader,
} as ComponentMeta<typeof PageHeader>;

const Template: ComponentStory<typeof PageHeader> = (args) => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <PageHeader {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: "Page title",
  itemName: "project",
};
