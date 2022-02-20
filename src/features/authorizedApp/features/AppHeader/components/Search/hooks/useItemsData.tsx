import React from "react";

import { useLabels, useTasks, useProjects } from "@/features/authorizedApp/api";

export function useItemsData() {
  const labelsQuery = useLabels();
  const tasksQuery = useTasks();
  const projectsQuery = useProjects();
  const isDataReady = labelsQuery.data && tasksQuery.data && projectsQuery.data;
  const isError =
    labelsQuery.isError || tasksQuery.isError || projectsQuery.isError;

  const data = React.useMemo(() => {
    if (!isDataReady) return [];

    console.log("memo");

    const projectsData = projectsQuery.data.map((project) => ({
      ...project,
      type: "project" as const,
    }));
    const labelsData = labelsQuery.data.map((label) => ({
      ...label,
      type: "label" as const,
    }));
    const tasksData = tasksQuery.data.map((task) => ({
      ...task,
      type: "task" as const,
    }));

    return [...projectsData, ...labelsData, ...tasksData];
  }, [isDataReady, labelsQuery.data, projectsQuery.data, tasksQuery.data]);

  if (isError) {
    // The error boundary will catch it.
    throw new Error("The data wasn't got.");
  }

  if (!isDataReady) {
    return {
      isLoading: true as const,
      data,
    };
  }

  return {
    isLoading: false as const,
    data,
  };
}

export type ItemsData = ReturnType<typeof useItemsData>["data"];
