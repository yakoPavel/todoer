import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ProjectsMenuLink } from "./ProjectsMenuLink";

export default {
  title: "Authorized app/SideMenu/MenuLink/ProjectsMenuLink",
  component: ProjectsMenuLink,
} as ComponentMeta<typeof ProjectsMenuLink>;

const Template: ComponentStory<typeof ProjectsMenuLink> = (args) => (
  <div style={{ width: 250 }}>
    <ProjectsMenuLink {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  isFavorite: false,
  name: "Project name",
  numberOfTasks: 32,
};
