import { Task } from "../../types";
import { generateGetItemQuery } from "../utils/getItems/generateGetItemsQuery";

export const { getItem: getTask, useItem: useTask } =
  generateGetItemQuery<Task>({
    dataLabel: ["tasks"],
    endpoint: "/tasks",
  });
