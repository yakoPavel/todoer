import styled from "@emotion/styled/macro";
import React from "react";
import { IconType } from "react-icons";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import { EditableTitle } from "../EditableTitle/EditableTitle";

import { Tooltip } from "@/components/Tooltip/Tooltip";
import { BackgroundButton } from "@/features/authorizedApp/components/BackgroundButton/BackgroundButton";

const StyledHeader = styled.header`
  width: 100%;
`;

const Content = styled.div`
  padding: 3.6rem 5.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ButtonsContainer = styled.div`
  flex-shrink: 0;
  margin-left: 1rem;

  & > *:not(:first-child) {
    margin-left: 1rem;
  }
`;

type HeaderButtonProps = {
  onClick: () => void;
  tooltipText: string;
  IconComponent: IconType;
};

const HeaderButton = ({
  onClick,
  tooltipText,
  IconComponent,
}: HeaderButtonProps) => {
  return (
    <Tooltip tooltipText={tooltipText}>
      <BackgroundButton type="button" onClick={onClick}>
        <IconComponent size="3rem" />
      </BackgroundButton>
    </Tooltip>
  );
};

type HeaderProps = {
  /** A title of the project. */
  projectTitle: string;
  /** A callback that will be called when the 'edit project' button is pressed. */
  onEditProject: () => void;
  /** A callback that will be called when the 'delete project' button is pressed. */
  onDeleteProject: () => void;
  /** A callback that will be called with a new title when the old one gets edited. */
  onProjectTitleEdited: (newTitle: string) => void;
};

export const Header = ({
  projectTitle,
  onEditProject,
  onDeleteProject,
  onProjectTitleEdited,
}: HeaderProps) => {
  return (
    <StyledHeader>
      <Content>
        <EditableTitle title={projectTitle} onEditEnd={onProjectTitleEdited} />
        <ButtonsContainer>
          <HeaderButton
            IconComponent={AiOutlineEdit}
            onClick={onEditProject}
            tooltipText="Edit the project"
          />
          <HeaderButton
            IconComponent={AiOutlineDelete}
            onClick={onDeleteProject}
            tooltipText="Delete the project"
          />
        </ButtonsContainer>
      </Content>
    </StyledHeader>
  );
};
