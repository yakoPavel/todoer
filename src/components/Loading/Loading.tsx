import { Spinner } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import React from "react";

import LogoImg from "@/assets/logo.png";

const Container = styled.div`
  background: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled.div`
  background-color: ${({ theme }) => theme.main};
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  margin-bottom: 2rem;
  min-height: 5rem;
`;
const Logo = styled.img`
  width: 20rem;
`;

const StyledSpinner = styled(Spinner)`
  color: ${({ theme }) => theme.main}; ;
`;

export const Loading: React.FC = () => {
  return (
    <Container>
      <LogoWrapper>
        <Logo src={LogoImg} alt="Todoer logo" />
      </LogoWrapper>
      <StyledSpinner data-testid="spinner" size="xl" />
    </Container>
  );
};
