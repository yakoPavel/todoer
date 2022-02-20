import { Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import { MdLabel } from "react-icons/md";

import { ItemsData } from "../Search";

import * as Styled from "./styles";

type ProjectOrLabelIconProps = {
  color: string;
  type: "project" | "label";
};
const ProjectOrLabelIcon = ({ color, type }: ProjectOrLabelIconProps) => {
  return (
    <Styled.ProjectOrLabelContainer iconColor={color} aria-hidden>
      {type === "label" ? (
        <MdLabel size="2rem" />
      ) : (
        <GoPrimitiveDot size="2.5rem" />
      )}
    </Styled.ProjectOrLabelContainer>
  );
};

type TaskIconProps = {
  isDone: boolean;
};
const TaskIcon = ({ isDone }: TaskIconProps) => {
  return (
    <Styled.TaskIconContainer isDone={isDone} aria-hidden>
      {<AiOutlineCheck style={{ opacity: isDone ? 1 : 0 }} />}
    </Styled.TaskIconContainer>
  );
};

function generateLinkPath(type: "project" | "task" | "label", id: string) {
  switch (type) {
    case "project":
    case "task":
      return `/projects/${id}`;
    case "label":
      return `/labels/${id}`;
  }
}

type SearchItemProps = {
  /** Item data. */
  data: ItemsData[number];
};
export const SearchItem = React.forwardRef<HTMLLIElement, SearchItemProps>(
  ({ data }, ref) => {
    return (
      <Styled.Container ref={ref}>
        <Styled.Link
          to={generateLinkPath(
            data.type,
            data.type === "task" ? data.projectId : data.id,
          )}
        >
          {data.type === "task" ? (
            <TaskIcon isDone={Boolean(data.done)} />
          ) : (
            <ProjectOrLabelIcon type={data.type} color={data.color} />
          )}
          <Styled.NameContainer>
            <Text>{data.name}</Text>
          </Styled.NameContainer>
        </Styled.Link>
      </Styled.Container>
    );
  },
);
SearchItem.displayName = "SearchItem";
