import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { LabelImpl as Label } from "./Label";

import { Modals } from "@/features/authorizedApp/features/Modals";
import { db } from "@/test/server/db";

const labelId = db.label.getAll()[0].id;

export default {
  title: "Authorized app/Page/Label",
  component: Label,
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => (
  <>
    <Modals />
    <Label {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  labelId,
};
