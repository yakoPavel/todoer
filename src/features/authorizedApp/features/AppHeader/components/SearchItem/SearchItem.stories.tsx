import { ComponentMeta, ComponentStory } from "@storybook/react";
import Chance from "chance";
import React from "react";

const SEED = 12345;
const chance = new Chance(SEED);

import { SearchItem } from "./SearchItem";

export default {
  title: "Authorized app/AppHeader/SearchItem",
  component: SearchItem,
} as ComponentMeta<typeof SearchItem>;

const Template: ComponentStory<typeof SearchItem> = (args) => (
  <SearchItem {...args} />
);

const taskData = {
  type: "task" as const,
  name: "Task name",
  done: false,
  createdAt: Date.now(),
  description: chance.sentence(),
  id: chance.word(),
  projectId: chance.word(),
};

export const OngoingTask = Template.bind({});
OngoingTask.args = {
  data: taskData,
  searchQuery: "na",
};

export const FinishedTask = Template.bind({});
FinishedTask.args = {
  ...OngoingTask.args,
  data: {
    ...taskData,
    done: true,
  },
};

export const Project = Template.bind({});
Project.args = {
  data: {
    type: "project" as const,
    name: "Project name",
    color: "gold",
    createdAt: Date.now(),
    id: chance.word(),
    isFavorite: false,
    taskIds: [],
  },
  searchQuery: "na",
};

export const Label = Template.bind({});
Label.args = {
  data: {
    type: "label" as const,
    name: "Label name",
    color: "gold",
    createdAt: Date.now(),
    id: chance.word(),
    isFavorite: false,
  },
  searchQuery: "na",
};
