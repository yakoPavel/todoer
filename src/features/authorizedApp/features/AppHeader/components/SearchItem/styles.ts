import isPropValid from "@emotion/is-prop-valid";
import styled from "@emotion/styled/macro";
import { Link as RouterLink } from "react-router-dom";

export const Container = styled.li`
  list-style: none;

  &:hover {
    background: ${({ theme }) => theme.backgroundTertiary};
  }
`;

export const Link = styled(RouterLink)`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 1rem;
`;

export const ProjectOrLabelContainer = styled("span", {
  shouldForwardProp: isPropValid,
})<{ iconColor: string }>`
  margin-right: 2rem;
  display: flex;
  align-items: center;
  color: ${({ iconColor }) => iconColor};
`;

export const TaskIconContainer = styled("span", {
  shouldForwardProp: isPropValid,
})<{ isDone: boolean }>`
  border: 1px solid ${({ theme }) => theme.textSecondary};
  border-radius: 50%;
  padding: 0.3rem;
  margin-right: 2rem;
  color: ${({ theme }) => theme.textSecondary};

  background-color: ${({ isDone, theme }) =>
    isDone ? theme.backgroundTertiary : "unset"};
`;

export const NameContainer = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
`;
