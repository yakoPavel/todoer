import { Task } from "../../types";
import { generateGetItemsQuery } from "../utils/getItems/generateGetItemsQuery";

export const { getItems: getTasks, useItems: useTasks } =
  generateGetItemsQuery<Task>({ dataLabel: "tasks", endpoint: "/tasks" });
