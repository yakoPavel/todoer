import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import StyledLink from "components/UI/StyledLink/StyledLink";
import AuthProviderButtons from "components/Unauthorized/AuthProviderButtons/AuthProviderButtons";
import LoginWithPasswordForm from "components/Unauthorized/Form/LoginWithPasswordForm";
import UnauthorizedScreen from "components/Unauthorized/UnauthorizedScreen/UnauthorizedScreen";
import React from "react";

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
