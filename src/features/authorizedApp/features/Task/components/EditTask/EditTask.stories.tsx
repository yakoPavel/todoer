import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { EditTask } from "./EditTask";

export default {
  title: "Authorized app/Task/EditTask",
  component: EditTask,
} as ComponentMeta<typeof EditTask>;

const Template: ComponentStory<typeof EditTask> = (args) => (
  <div style={{ width: "50%" }}>
    <EditTask {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  initialDescription: "Old description",
  initialTitle: "Old title",
};
