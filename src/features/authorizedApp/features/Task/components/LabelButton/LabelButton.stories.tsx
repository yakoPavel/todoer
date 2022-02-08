import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { LabelButton } from "./LabelButton";

import { db } from "@/test/server/db";

const taskId = db.task.getAll()[0].id;

export default {
  title: "Authorized app/Task/LabelButton",
  component: LabelButton,
} as ComponentMeta<typeof LabelButton>;

const Template: ComponentStory<typeof LabelButton> = (args) => (
  <LabelButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  taskId,
};
