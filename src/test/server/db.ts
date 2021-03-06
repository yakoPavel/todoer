import { factory, nullable, primaryKey, drop } from "@mswjs/data";
import { nanoid } from "nanoid";

const DB_KEY = "msw-db";

const models = {
  user: {
    id: primaryKey(String),
    projectIds: () => [] as string[],
    labelIds: () => [] as string[],
    createdAt: () => Date.now(),
  },
  project: {
    id: primaryKey(() => nanoid()),
    // Assigns on the client for optimistic updates
    tempId: String,
    userId: String,
    taskIds: () => [] as string[],
    createdAt: () => Date.now(),
    // Position in the list. It is used in sorting.
    position: Number,
    name: String,
    color: String,
    isFavorite: Boolean,
  },
  label: {
    id: primaryKey(() => nanoid()),
    tempId: String,
    userId: String,
    createdAt: () => Date.now(),
    position: Number,
    color: String,
    name: String,
    isFavorite: Boolean,
  },
  task: {
    id: primaryKey(() => nanoid()),
    tempId: String,
    userId: String,
    projectId: String,
    labelId: nullable(String),
    createdAt: () => Date.now(),
    position: Number,
    name: String,
    description: String,
    done: Boolean,
  },
};

export const db = factory(models);

export type Models = typeof models;

export type Model = keyof Models;

export const loadDb = () =>
  Object.assign(JSON.parse(window.localStorage.getItem(DB_KEY) || "{}"));

export const persistDb = (model: Model) => {
  if (process.env.NODE_ENV === "test") return;

  const data = loadDb();
  data[model] = db[model].getAll();
  window.localStorage.setItem(DB_KEY, JSON.stringify(data));
};

export const initializeDb = () => {
  const database = loadDb();
  Object.entries(db).forEach(([key, model]) => {
    const dataEntries = database[key];
    if (dataEntries) {
      dataEntries?.forEach((entry: Record<string, any>) => {
        model.create(entry);
      });
    }
  });
};

export const resetDb = () => {
  window.localStorage.clear();
  drop(db);
};

initializeDb();
