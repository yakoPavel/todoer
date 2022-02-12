import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { TaskForm } from "./TaskForm";

export default {
  title: "Authorized app/Task/TaskForm",
  component: TaskForm,
} as ComponentMeta<typeof TaskForm>;

const Template: ComponentStory<typeof TaskForm> = (args) => (
  <div style={{ width: "50%" }}>
    <TaskForm {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  initialDescription: "Old description",
  initialTitle: "Old title",
};
