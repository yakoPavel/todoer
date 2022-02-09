import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Task } from "./Task";

import { db } from "@/test/server/db";

const taskId = db.task.getAll()[0].id;

export default {
  title: "Authorized app/Task/Task",
  component: Task,
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => {
  const [isDone, toggleIsDone] = React.useReducer(
    (prevState) => !prevState,
    false,
  );

  return (
    <div style={{ width: "50%" }}>
      <Task {...args} isDone={isDone} onDoneStatusChange={toggleIsDone} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  description: "This is a description of this task.",
  title: "Title of the task",
  id: taskId,
};

export const WithLongTitle = Template.bind({});
WithLongTitle.args = {
  description: "This is a description of this task.",
  title:
    "This is a very long title that is likely to overflow through its container.",
  id: taskId,
};
