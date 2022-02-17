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

  & > *:not(:first-of-type) {
    margin-left: 1rem;
  }
`;

type HeaderButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  onClick: () => void;
  tooltipText: string;
  IconComponent: IconType;
};

const HeaderButton = ({
  onClick,
  tooltipText,
  IconComponent,
  ...otherProps
}: HeaderButtonProps) => {
  return (
    <Tooltip tooltipText={tooltipText}>
      <BackgroundButton {...otherProps} type="button" onClick={onClick}>
        <IconComponent size="3rem" />
      </BackgroundButton>
    </Tooltip>
  );
};

type PageHeaderProps = {
  /** A title of the page. */
  title: string;
  /** A callback that will be called when the 'edit item' button is pressed. */
  onEdit: () => void;
  /** A callback that will be called when the 'delete item' button is pressed. */
  onDelete: () => void;
  /** A callback that will be called with a new title when the old one gets edited. */
  onTitleEdited: (newTitle: string) => void;
  /** A name of the item page belongs to. It will be substitute to the tooltips. */
  itemName: string;
};

export const PageHeader = ({
  title,
  onEdit,
  onDelete,
  onTitleEdited,
  itemName,
}: PageHeaderProps) => {
  return (
    <StyledHeader>
      <Content>
        <EditableTitle title={title} onEditEnd={onTitleEdited} />
        <ButtonsContainer>
          <HeaderButton
            IconComponent={AiOutlineEdit}
            onClick={onEdit}
            tooltipText={`Edit the ${itemName}`}
            aria-label={`Edit the ${itemName}`}
          />
          <HeaderButton
            IconComponent={AiOutlineDelete}
            onClick={onDelete}
            tooltipText={`Delete the ${itemName}`}
            aria-label={`Delete the ${itemName}`}
          />
        </ButtonsContainer>
      </Content>
    </StyledHeader>
  );
};
