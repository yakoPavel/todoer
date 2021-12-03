import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Divider from "components/UI/Divider/Divider";
import StyledLink from "components/UI/StyledLink/StyledLink";
import AuthProviderButton from "components/Unauthorized/AuthProviderButton/AuthProviderButton";
import LoginForm from "components/Unauthorized/Form/Form";
import UnauthorizedContainer from "components/Unauthorized/UnauthorizedContainer/UnauthorizedContainer";
import React from "react";

const ForgotPasswordLink = styled(StyledLink)`
  display: block;
  margin-top: 1.5rem;
  color: ${({ theme }) => theme.textSecondaryActive};
` as typeof StyledLink;

const BottomDivider = styled(Divider)`
  margin: 2rem 0;
`;

const Login: React.FC = () => {
  return (
    <UnauthorizedContainer>
      <AuthProviderButton variant="google" />
      <AuthProviderButton variant="facebook" />
      <AuthProviderButton variant="apple" />

      <Divider inBetweenText="OR" />

      <LoginForm variant="signIn" />

      <ForgotPasswordLink to="/password-recovery">
        Forgot your password?
      </ForgotPasswordLink>

      <BottomDivider />

      <Text fontSize="sm" textAlign="center">
        Don&apos;t have an account?{" "}
        <StyledLink to="/sign-up">Sign up</StyledLink>
      </Text>
    </UnauthorizedContainer>
  );
};

export default Login;
