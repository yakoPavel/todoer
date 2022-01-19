import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import LabelsMenuLink from "./LabelsMenuLink";

export default {
  title: "Authorized app/SideMenu/MenuLink/LabelsMenuLink",
  component: LabelsMenuLink,
} as ComponentMeta<typeof LabelsMenuLink>;

const Template: ComponentStory<typeof LabelsMenuLink> = (args) => (
  <div style={{ width: 250 }}>
    <LabelsMenuLink {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  isFavorite: false,
  name: "Label name",
  color: "gold",
};
