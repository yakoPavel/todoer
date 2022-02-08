import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { LabelsList } from "./LabelsList";

import { db } from "@/test/server/db";

const taskId = db.task.getAll()[0].id;

export default {
  title: "Authorized app/Task/LabelsList/LabelsList",
  component: LabelsList,
} as ComponentMeta<typeof LabelsList>;

const Template: ComponentStory<typeof LabelsList> = (args) => (
  <LabelsList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  taskId,
};
