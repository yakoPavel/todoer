import { AxiosInstance } from "axios";
import { groupBy } from "lodash";

import { getProjects, getLabels, getTasks } from "@/features/authorizedApp/api";
import { queryClient } from "@/lib/react-query";

function setIndividualItemsData<T extends { id: string }>(
  data: T[],
  labelName: string,
) {
  data.forEach((item) => {
    queryClient.setQueryData([labelName, item.id], item);
  });
}

function setTasksForProjects<T extends { projectId: string }>(tasksData: T[]) {
  const tasksGroupedByProjects = groupBy(tasksData, (task) => task.projectId);
  Object.entries(tasksGroupedByProjects).forEach(
    ([projectId, tasksForTheProject]) => {
      queryClient.setQueryData(
        ["tasks", { project: projectId }],
        tasksForTheProject,
      );
    },
  );
}

export async function prefetchData(client: Promise<AxiosInstance>) {
  const [projectsData, labelsData, tasksData] = await Promise.all([
    queryClient.fetchQuery("projects", () => getProjects(client)),
    queryClient.fetchQuery("labels", () => getLabels(client)),
    queryClient.fetchQuery("tasks", () => getTasks(client)),
  ]);

  setIndividualItemsData(projectsData, "projects");
  setIndividualItemsData(labelsData, "labels");
  setIndividualItemsData(tasksData, "tasks");

  setTasksForProjects(tasksData);
}
