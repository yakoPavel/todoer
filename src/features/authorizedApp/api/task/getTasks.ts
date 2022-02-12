import { Task } from "../../types";
import { generateGetItemsQuery } from "../utils/getItems/generateGetItemsQuery";

export const { getItems: getTasks, useItems: useTasks } =
  generateGetItemsQuery<Task>({ dataLabel: ["tasks"], endpoint: "/tasks" });

export const useTasksForProject = (projectId: string) => {
  const params = new URLSearchParams();
  params.set("projectId", projectId);

  const { useItems } = generateGetItemsQuery<Task>({
    dataLabel: ["tasks", { project: projectId }],
    dataLabelForItem: ["tasks"],
    endpoint: "/tasks",
  });

  return useItems(params);
};
