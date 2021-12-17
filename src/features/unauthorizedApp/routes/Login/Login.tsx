import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import StyledLink from "components/StyledLink/StyledLink";
import React from "react";

import AuthProviderButtons from "../../components/AuthProviderButtons/AuthProviderButtons";
import UnauthorizedScreen from "../../components/UnauthorizedScreen/UnauthorizedScreen";
import { LoginWithPasswordForm } from "../../features/Form";

const ForgotPasswordLink = styled(StyledLink)`
  display: block;
  margin-top: 1.5rem;
  color: ${({ theme }) => theme.textSecondaryActive};
` as typeof StyledLink;

const Login: React.FC = () => {
  return (
    <UnauthorizedScreen
      topSlot={<AuthProviderButtons />}
      topSlotDividerText="OR"
      middleSlot={
        <>
          <LoginWithPasswordForm />

          <ForgotPasswordLink to="/password-recovery">
            Forgot your password?
          </ForgotPasswordLink>
        </>
      }
      bottomSlot={
        <Text fontSize="sm" textAlign="center">
          Don&apos;t have an account?{" "}
          <StyledLink to="/sign-up">Sign up</StyledLink>
        </Text>
      }
    />
  );
};

export default Login;
