import { Heading, Text } from "@chakra-ui/react";
import React from "react";

import { UnauthorizedScreen } from "../../components/UnauthorizedScreen/UnauthorizedScreen";
import { PasswordRecoveryForm } from "../../features/Form";

import { StyledLink } from "@/components/StyledLink/StyledLink";

export const PasswordRecovery: React.FC = () => {
  return (
    <UnauthorizedScreen
      topSlot={
        <>
          <Heading as="h1" fontSize="2xl">
            Forgot your password?
          </Heading>
          <Text whiteSpace="normal" fontSize="sm" margin="2rem 0 1rem">
            To reset your password, please enter the email address of your
            account.
          </Text>
        </>
      }
      topSlotDividerText={null}
      middleSlot={<PasswordRecoveryForm />}
      bottomSlot={
        <Text fontSize="sm" textAlign="center">
          <StyledLink to="/">Go to login</StyledLink>
        </Text>
      }
    />
  );
};
