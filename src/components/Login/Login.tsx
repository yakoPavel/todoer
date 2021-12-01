import Divider from "components/UI/Divider/Divider";
import Tooltip from "components/UI/Tooltip/Tooltip";
import React from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { BsApple, BsFacebook, BsGoogle } from "react-icons/bs";

import LogoImg from "./logo.png";
import * as Styled from "./styles";

const PasswordInput = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Styled.PasswordInputWrapper>
      <Styled.Input type={show ? "text" : "password"} />
      <Tooltip tooltipText={show ? "Hide password" : "Show password"}>
        <Styled.PasswordVisibilityBtn onClick={handleClick} type="button">
          {show && <BiShow size={24} />}
          {!show && <BiHide size={24} />}
        </Styled.PasswordVisibilityBtn>
      </Tooltip>
    </Styled.PasswordInputWrapper>
  );
};

const Login: React.FC = () => {
  return (
    <Styled.Wrapper>
      <Styled.ContentWrapper>
        <Styled.BrandSection>
          <Styled.Logo src={LogoImg} alt="logo" />
          <Styled.Slogan>Makes your life organized</Styled.Slogan>
        </Styled.BrandSection>
        <Styled.LoginWrapper>
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

          <Styled.Form>
            <Styled.FormSection>
              <Styled.Label htmlFor="email">Email</Styled.Label>
              <Styled.Input id="email" type="email" />
            </Styled.FormSection>
            <Styled.FormSection>
              <Styled.Label htmlFor="password">Password</Styled.Label>
              <PasswordInput />
            </Styled.FormSection>
          </Styled.Form>
        </Styled.LoginWrapper>
      </Styled.ContentWrapper>
    </Styled.Wrapper>
  );
};

export default Login;
