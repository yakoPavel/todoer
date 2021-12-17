import { Heading, Text } from "@chakra-ui/react";
import StyledLink from "components/UI/StyledLink/StyledLink";
import PasswordRecoveryForm from "components/Unauthorized/Form/PasswordRecoveryForm";
import UnauthorizedScreen from "components/Unauthorized/UnauthorizedScreen/UnauthorizedScreen";
import React from "react";

const PasswordRecovery: React.FC = () => {
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

export default PasswordRecovery;
