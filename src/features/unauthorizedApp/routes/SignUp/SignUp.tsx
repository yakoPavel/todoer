import { Text } from "@chakra-ui/react";
import React from "react";

import AuthProviderButtons from "../../components/AuthProviderButtons/AuthProviderButtons";
import UnauthorizedScreen from "../../components/UnauthorizedScreen/UnauthorizedScreen";
import { SignUpWithPasswordForm } from "../../features/Form";

import StyledLink from "@/components/StyledLink/StyledLink";

const SignUp: React.FC = () => {
  return (
    <UnauthorizedScreen
      topSlot={<AuthProviderButtons />}
      topSlotDividerText="OR"
      middleSlot={<SignUpWithPasswordForm />}
      bottomSlot={
        <Text fontSize="sm" textAlign="center">
          Already signed up? <StyledLink to="/">Log in</StyledLink>
        </Text>
      }
    />
  );
};

export default SignUp;
