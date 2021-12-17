import { Text } from "@chakra-ui/react";
import StyledLink from "components/UI/StyledLink/StyledLink";
import AuthProviderButtons from "components/Unauthorized/AuthProviderButtons/AuthProviderButtons";
import SignUpWithPasswordForm from "components/Unauthorized/Form/SignUpWithPasswordForm";
import UnauthorizedScreen from "components/Unauthorized/UnauthorizedScreen/UnauthorizedScreen";
import React from "react";

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
