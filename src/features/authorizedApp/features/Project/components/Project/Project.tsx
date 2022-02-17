import { groupBy } from "lodash";
import React from "react";
import { useParams } from "react-router-dom";

import { CompletedTasks } from "../CompletedTasks/CompletedTasks";
import { OngoingTasks } from "../OngoingTasks/OngoingTasks";

import { useCorrectLocation } from "./hooks/useCorrectLocation";
import { useEditProjectHandlers } from "./hooks/useEditProjectHandlers";
import * as Styled from "./styles";

import { useProject, useTasks } from "@/features/authorizedApp/api";
import { ErrorScreen } from "@/features/authorizedApp/components/ErrorScreen/ErrorScreen";
import { PageHeader } from "@/features/authorizedApp/components/PageHeader/PageHeader";
import { Spinner } from "@/features/authorizedApp/components/Spinner/Spinner";

type ProjectImplProps = {
  projectId: string;
};

export const ProjectImpl = ({ projectId }: ProjectImplProps) => {
  const projectQuery = useProject({ itemId: projectId });
  const allTasksQuery = useTasks();

  useCorrectLocation(projectQuery);

  const { onDeleteProject, onEditProject, onProjectTitleEdited } =
    useEditProjectHandlers(projectId);

  if (projectQuery.isError || allTasksQuery.isError) {
    return <ErrorScreen />;
  }

  if (!projectQuery.data || !allTasksQuery.data) {
    return <Spinner size="xl" />;
  }

  const tasksData = allTasksQuery.data.filter(
    (task) => task.projectId === projectId,
  );

  const { completedTasks = [], ongoingTasks = [] } = groupBy(
    tasksData,
    (taskData) => (taskData.done ? "completedTasks" : "ongoingTasks"),
  );

  return (
    <Styled.Container>
      <Styled.ContentContainer>
        <PageHeader
          onDelete={onDeleteProject}
          onEdit={onEditProject}
          onTitleEdited={onProjectTitleEdited}
          title={projectQuery.data.name}
          itemName="project"
        />
        <OngoingTasks tasks={ongoingTasks} projectId={projectId} />
        <CompletedTasks tasks={completedTasks} />
      </Styled.ContentContainer>
    </Styled.Container>
  );
};

export const Project: React.FC = () => {
  const { projectId } = useParams() as { projectId: string };

  return <ProjectImpl projectId={projectId} />;
};
