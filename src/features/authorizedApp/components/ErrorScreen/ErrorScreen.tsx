import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import React from "react";
import { BiError } from "react-icons/bi";
import { HiStatusOffline } from "react-icons/hi";

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 2rem 1rem;
`;

const IconContainer = styled.div`
  color: ${({ theme }) => theme.main};
  margin-bottom: 2rem;
`;

const Message = styled(Text)`
  text-align: center;
  font-size: 1.7rem;
`;

export type ErrorScreenProps = {
  /**
   * If true and there is no connection right now, the component will show a
   * corresponding message.
   */
  detectOffline?: boolean;
  /**
   * A message the component will show.
   */
  message?: string;
};

export const ErrorScreen = ({
  detectOffline = true,
  message = "Oops, something went wrong",
}: ErrorScreenProps) => {
  const showOfflineMessage = detectOffline && !navigator.onLine;

  return (
    <Container data-testid="errorScreen">
      <IconContainer aria-hidden data-testid="errorIcon">
        {showOfflineMessage && <HiStatusOffline size="5rem" />}
        {!showOfflineMessage && <BiError size="5rem" />}
      </IconContainer>

      {showOfflineMessage && (
        <Message>
          You are offline now. <br /> Check your connection and try again.
        </Message>
      )}
      {!showOfflineMessage && <Message>{message}</Message>}
    </Container>
  );
};
