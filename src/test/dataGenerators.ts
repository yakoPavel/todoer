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

export type PopulateDbOptions = {
  numberOfProjects?: number;
  numberOfFavoriteProjects?: number;

  numberOfLabels?: number;
  numberOfFavoriteLabels?: number;

  numberOfTasks?: number;
  numberOfTasksWithLabels?: number;
};
export const populateDb = ({
  numberOfProjects = 5,
  numberOfFavoriteProjects = 3,

  numberOfTasks = 12,
  numberOfTasksWithLabels = 5,

  numberOfLabels = 3,
  numberOfFavoriteLabels = 3,
}: PopulateDbOptions) => {
  const user = createUser({
    id: "SOME_USER_ID",
  });

  const projects = Array.from({ length: numberOfProjects }, (_, index) => {
    const projectSettings: Record<string, unknown> = {
      userId: user.id,
      position: index,
    };

    if (numberOfFavoriteProjects !== undefined) {
      projectSettings.isFavorite = index < numberOfFavoriteProjects;
    }

    return createProject(projectSettings);
  });

  const labels = Array.from({ length: numberOfLabels }, (_, index) => {
    const labelSettings: Record<string, unknown> = {
      userId: user.id,
      position: index,
    };

    if (numberOfFavoriteLabels !== undefined) {
      labelSettings.isFavorite = index < numberOfFavoriteLabels;
    }

    return createLabel(labelSettings);
  });

  const tasks = Array.from({ length: numberOfTasks }, (_, index) => {
    const projectTaskBelongsTo = projects[index % projects.length];
    if (!projectTaskBelongsTo) {
      throw new Error("There must be at least one project to add tasks to.");
    }
    const taskLabel =
      index < numberOfTasksWithLabels
        ? labels[index % labels.length]
        : undefined;

    return createTask({
      userId: user.id,
      position: index,
      projectId: projectTaskBelongsTo.id,
      labelId: taskLabel?.id,
    });
  });

  return { user, projects, labels, tasks };
};
