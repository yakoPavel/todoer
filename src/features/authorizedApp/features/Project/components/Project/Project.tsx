import { groupBy } from "lodash";
import React from "react";
import { useParams } from "react-router-dom";

import { CompletedTasks } from "../CompletedTasks/CompletedTasks";
import { Header } from "../Header/Header";
import { OngoingTasks } from "../OngoingTasks/OngoingTasks";

import { useEditProjectHandlers } from "./hooks/useEditProjectHandlers";
import { useTranslatePosition } from "./hooks/useTranslatePosition";
import * as Styled from "./styles";

import { useProject, useTasks } from "@/features/authorizedApp/api";
import { ErrorScreen } from "@/features/authorizedApp/components/ErrorScreen/ErrorScreen";
import { Spinner } from "@/features/authorizedApp/components/Spinner/Spinner";

type ProjectImplProps = {
  projectId: string;
};

export const ProjectImpl = ({ projectId }: ProjectImplProps) => {
  const projectQuery = useProject({ itemId: projectId });
  const allTasksQuery = useTasks();

  const { onDeleteProject, onEditProject, onProjectTitleEdited } =
    useEditProjectHandlers(projectId);

  const translatePositionStyle = useTranslatePosition();

  if (projectQuery.isError || allTasksQuery.isError) {
    return <ErrorScreen />;
  }

  if (!projectQuery.data || !allTasksQuery.data) {
    return <Spinner size="xl" />;
  }

  const tasksData = allTasksQuery.data.filter(
    (task) => task.projectId === projectId,
  );

  const { completedTasks, ongoingTasks } = groupBy(tasksData, (taskData) =>
    taskData.done ? "completedTasks" : "ongoingTasks",
  );

  return (
    <Styled.Container>
      <Styled.ContentContainer style={{ transform: translatePositionStyle }}>
        <Header
          onDeleteProject={onDeleteProject}
          onEditProject={onEditProject}
          onProjectTitleEdited={onProjectTitleEdited}
          projectTitle={projectQuery.data.name}
        />
        {Boolean(ongoingTasks?.length) && (
          <OngoingTasks tasks={ongoingTasks} projectId={projectId} />
        )}
        {Boolean(completedTasks?.length) && (
          <CompletedTasks tasks={completedTasks} />
        )}
      </Styled.ContentContainer>
    </Styled.Container>
  );
};

export const Project: React.FC = () => {
  const { projectId } = useParams() as { projectId: string };

  return <ProjectImpl projectId={projectId} />;
};
