import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import React from "react";
import { GiSpiderWeb } from "react-icons/gi";

const Container = styled.div`
  color: ${({ theme }) => theme.main};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledText = styled(Text)`
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  margin-top: 2rem;
`;

export const NoTasks: React.FC = () => {
  return (
    <Container>
      <GiSpiderWeb size="13rem" />
      <StyledText>No tasks with this label at the moment</StyledText>
    </Container>
  );
};
