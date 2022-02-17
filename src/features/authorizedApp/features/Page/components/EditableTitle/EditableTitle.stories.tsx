import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { EditableTitle } from "./EditableTitle";

export default {
  title: "Authorized app/Page/EditableTitle",
  component: EditableTitle,
} as ComponentMeta<typeof EditableTitle>;

const Template: ComponentStory<typeof EditableTitle> = (args) => (
  <EditableTitle {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Title",
};
