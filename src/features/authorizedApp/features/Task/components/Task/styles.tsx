import { Text } from "@chakra-ui/react";
import isPropValid from "@emotion/is-prop-valid";
import styled from "@emotion/styled/macro";

import { BackgroundButton } from "@/features/authorizedApp/components/BackgroundButton/BackgroundButton";

export const Container = styled.li`
  display: flex;
  align-items: flex-start;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.separators};
  padding: 0.8rem 0;
`;

export const CheckboxContainer = styled.div`
  margin-top: 0.4rem;
`;

export const TaskContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  max-width: 50%;
  min-width: 15rem;
`;

export const Title = styled(Text, { shouldForwardProp: isPropValid })<{
  isDone: boolean;
}>`
  color: ${({ theme, isDone }) => (isDone ? theme.textSecondary : theme.text)};
  text-decoration: ${({ isDone }) => (isDone ? "line-through" : "none")};
  font-size: 1.5rem;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LabelButtonContainer = styled.span`
  margin-left: 1rem;
  display: flex;
`;

export const Description = styled(Text)`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.3rem;
`;

export const ClickPopupTriggerContainer = styled(BackgroundButton)`
  padding: 0.5rem;

  align-self: center;
  margin-left: auto;

  @media (hover: hover) {
    opacity: 0;

    ${Container}:hover & {
      opacity: 1;
    }
  }
`;
