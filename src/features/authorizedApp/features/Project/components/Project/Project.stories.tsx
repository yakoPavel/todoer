import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { ProjectImpl as Project } from "./Project";

import { Modals } from "@/features/authorizedApp/features/Modals";
import { db } from "@/test/server/db";

const projectId = db.project.getAll()[0].id;

export default {
  title: "Authorized app/Project",
  component: Project,
} as ComponentMeta<typeof Project>;

const Template: ComponentStory<typeof Project> = (args) => (
  <>
    <Modals />
    <Project {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  projectId,
};
