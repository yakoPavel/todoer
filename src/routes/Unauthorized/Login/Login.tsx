import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Divider from "components/UI/Divider/Divider";
import StyledLink from "components/UI/StyledLink/StyledLink";
import * as AuthInput from "components/Unauthorized/AuthInput/AuthInput";
import * as AuthPasswordInput from "components/Unauthorized/AuthPasswordInput/AuthPasswordInput";
import AuthProviderButton from "components/Unauthorized/AuthProviderButton/AuthProviderButton";
import ConfirmButton from "components/Unauthorized/ConfirmButton/ConfirmButton";
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

const Form = styled.form`
  margin-bottom: 1rem;

  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const Login: React.FC = () => {
  return (
    <UnauthorizedContainer>
      <AuthProviderButton variant="google" />
      <AuthProviderButton variant="facebook" />
      <AuthProviderButton variant="apple" />

      <Divider inBetweenText="OR" />

      <Form>
        <AuthInput.AuthInputWrapper>
          <AuthInput.AuthInputLabel htmlFor="email">
            Email
          </AuthInput.AuthInputLabel>
          <AuthInput.AuthInputField id="email" type="email" />
        </AuthInput.AuthInputWrapper>
        <AuthPasswordInput.AuthPasswordInputWrapper>
          <AuthPasswordInput.AuthPasswordInputLabel htmlFor="password">
            Password
          </AuthPasswordInput.AuthPasswordInputLabel>
          <AuthPasswordInput.AuthPasswordInputField id="password" />
        </AuthPasswordInput.AuthPasswordInputWrapper>
        <ConfirmButton>Log in</ConfirmButton>
      </Form>

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
