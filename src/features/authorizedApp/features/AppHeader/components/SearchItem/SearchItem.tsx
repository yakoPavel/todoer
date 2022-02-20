import { Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import { MdLabel } from "react-icons/md";

import { ItemsData } from "../Search";

import * as Styled from "./styles";
import { generateLinkPath } from "./utils/generateLinkPath";
import { wrapIntoMarkTag } from "./utils/wrapIntoMarkTag";

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

type SearchItemProps = {
  /** Item data. */
  data: ItemsData[number];
  /**
   * A search query. Will be used to wrap a matching part of the item name into
   * a `<mark>` tag.
   * */
  searchQuery: string;
};
export const SearchItem = React.forwardRef<HTMLLIElement, SearchItemProps>(
  ({ data, searchQuery }, ref) => {
    const linkPath = generateLinkPath(
      data.type,
      data.type === "task" ? data.projectId : data.id,
    );

    return (
      <Styled.Container ref={ref} onMouseDown={(e) => e.preventDefault()}>
        <Styled.Link to={linkPath} data-search-link>
          {data.type === "task" ? (
            <TaskIcon isDone={Boolean(data.done)} />
          ) : (
            <ProjectOrLabelIcon type={data.type} color={data.color} />
          )}
          <Styled.NameContainer>
            <Text>{wrapIntoMarkTag(data.name, searchQuery)}</Text>
          </Styled.NameContainer>
        </Styled.Link>
      </Styled.Container>
    );
  },
);
SearchItem.displayName = "SearchItem";
