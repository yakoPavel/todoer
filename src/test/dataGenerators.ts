import { nanoid } from "nanoid";

import { db } from "./server/db";
import { UniqueChance } from "./UniqueChance";

import { LABEL_COLORS } from "@/config/labelColors";

const SEED = 12345;
const chance = new UniqueChance(SEED);

export type Overrides = Record<string, unknown>;

export const generateUser = (overrides?: Overrides) => ({
  id: nanoid(),
  projectIds: [] as string[],
  labelIds: [] as string[],
  createdAt: chance.date().getTime(),
  ...overrides,
});

export const generateProject = (overrides?: Overrides) => ({
  id: nanoid(),
  userId: nanoid(),
  tasksId: [] as string[],
  createdAt: chance.date().getTime(),
  name: chance.word(),
  color: chance.pickone(LABEL_COLORS).value,
  isFavorite: chance.bool(),
  ...overrides,
});

export const generateTask = (overrides?: Overrides) => ({
  id: nanoid(),
  userId: nanoid(),
  projectId: nanoid(),
  labelId: nanoid(),
  createdAt: chance.date().getTime(),
  name: chance.word(),
  description: chance.sentence(),
  done: chance.bool(),
  ...overrides,
});

export const generateLabel = (overrides?: Overrides) => ({
  id: nanoid(),
  userId: nanoid(),
  createdAt: chance.date().getTime(),
  color: chance.pickone(LABEL_COLORS).value,
  name: chance.word(),
  isFavorite: chance.bool(),
  ...overrides,
});

export const createUser = (userProps?: Overrides) => {
  const user = generateUser(userProps);
  return db.user.create(user);
};

export const createProject = (projectProps?: Overrides) => {
  const project = generateProject(projectProps);
  return db.project.create(project);
};

export const createTask = (taskProps?: Overrides) => {
  const task = generateTask(taskProps);
  return db.task.create(task);
};

export const createLabel = (labelProps?: Overrides) => {
  const label = generateLabel(labelProps);
  return db.label.create(label);
};
