import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import React from "react";
import { BiError } from "react-icons/bi";
import { HiStatusOffline } from "react-icons/hi";

import { Button } from "@/components/Button/Button";

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

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

const TryAgainButton = styled(Button)`
  margin-top: 1.5rem;
  font-weight: 700;
  font-size: 1.4rem;
`;

type ErrorScreenBaseProps = {
  /**
   * If true and there is no connection right now, the component will show a
   * corresponding message.
   */
  detectOffline?: boolean;
  /** A message the component will show. */
  message?: string;
};

type ErrorScreenWithTryAgainButtonProps = {
  /** Whether or not to show the 'Try again' button. */
  tryAgainButton: true;
  /** A function that will be called when the 'Try again' button is clicked. */
  onTryAgainClick: () => void;
};

type ErrorScreenWithoutTryAgainButtonProps = {
  /** Whether or not to show the 'Try again' button. */
  tryAgainButton?: false;
  /** A function that will be called when the 'Try again' button is clicked. */
  onTryAgainClick?: undefined;
};

export type ErrorScreenProps =
  | (ErrorScreenBaseProps & ErrorScreenWithTryAgainButtonProps)
  | (ErrorScreenBaseProps & ErrorScreenWithoutTryAgainButtonProps);

export const ErrorScreen = ({
  detectOffline = true,
  message = "Oops, something went wrong",
  ...otherProps
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
      {otherProps.tryAgainButton && (
        <TryAgainButton onClick={otherProps.onTryAgainClick}>
          Try Again
        </TryAgainButton>
      )}
    </Container>
  );
};
