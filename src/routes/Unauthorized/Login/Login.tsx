/** @jsxImportSource @emotion/react */
import { Text } from "@chakra-ui/react";
import { css } from "@emotion/react/macro";
import Divider from "components/UI/Divider/Divider";
import StyledLink from "components/UI/StyledLink/StyledLink";
import * as AuthInput from "components/Unauthorized/AuthInput/AuthInput";
import * as AuthPasswordInput from "components/Unauthorized/AuthPasswordInput/AuthPasswordInput";
import UnauthorizedContainer from "components/Unauthorized/UnauthorizedContainer/UnauthorizedContainer";
import React from "react";
import { BsApple, BsFacebook, BsGoogle } from "react-icons/bs";

import * as Styled from "./styles";

const marginBottomStyle = css`
  margin-bottom: 1rem;
`;

const EmailLogin = (): JSX.Element => {
  return (
    <>
      <form css={marginBottomStyle}>
        <AuthInput.AuthInputWrapper>
          <AuthInput.AuthInputLabel htmlFor="email">
            Email
          </AuthInput.AuthInputLabel>
          <AuthInput.AuthInputField id="email" type="email" />
        </AuthInput.AuthInputWrapper>
        <AuthPasswordInput.AuthPasswordInputWrapper css={marginBottomStyle}>
          <AuthPasswordInput.AuthPasswordInputLabel htmlFor="password">
            Password
          </AuthPasswordInput.AuthPasswordInputLabel>
          <AuthPasswordInput.AuthPasswordInputField id="password" />
        </AuthPasswordInput.AuthPasswordInputWrapper>
        <Styled.LoginButton>Log in</Styled.LoginButton>
      </form>

      <Styled.ForgotPasswordLink to="/password-recovery">
        Forgot your password?
      </Styled.ForgotPasswordLink>
    </>
  );
};

const Login: React.FC = () => {
  return (
    <UnauthorizedContainer>
      <Styled.AuthProviderButton type="button">
        <BsGoogle size={24} /> Continue with Google
      </Styled.AuthProviderButton>
      <Styled.AuthProviderButton type="button">
        <BsFacebook size={24} /> Continue with Facebook
      </Styled.AuthProviderButton>
      <Styled.AuthProviderButton type="button">
        <BsApple size={24} /> Continue with Apple
      </Styled.AuthProviderButton>

      <Divider inBetweenText="OR" />

      <EmailLogin />

      <Styled.BottomDivider />

      <Text fontSize="sm" textAlign="center">
        Don&apos;t have an account?{" "}
        <StyledLink to="/sign-up">Sign up</StyledLink>
      </Text>
    </UnauthorizedContainer>
  );
};

export default Login;
