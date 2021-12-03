import styled from "@emotion/styled/macro";
import React from "react";

import * as AuthInput from "../AuthInput/AuthInput";
import * as AuthPasswordInput from "../AuthPasswordInput/AuthPasswordInput";
import ConfirmButton from "../ConfirmButton/ConfirmButton";

const StyledForm = styled.form`
  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

type FormProps = React.ComponentProps<"form"> & {
  /* A variant of the form. */
  variant: "signIn" | "signUp" | "passwordRecovery";
};

const Form = ({ variant, ...otherProps }: FormProps) => {
  const getFormContent = () => {
    if (variant === "passwordRecovery") {
      return (
        <>
          <AuthInput.AuthInputWrapper>
            <AuthInput.AuthInputLabel htmlFor="email">
              Email
            </AuthInput.AuthInputLabel>
            <AuthInput.AuthInputField id="email" type="email" />
          </AuthInput.AuthInputWrapper>
          <ConfirmButton>Reset my password</ConfirmButton>
        </>
      );
    }
    if (variant === "signIn") {
      return (
        <>
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
        </>
      );
    }
    if (variant === "signUp") {
      return (
        <>
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
          <AuthPasswordInput.AuthPasswordInputWrapper>
            <AuthPasswordInput.AuthPasswordInputLabel htmlFor="password">
              Confirm your password
            </AuthPasswordInput.AuthPasswordInputLabel>
            <AuthPasswordInput.AuthPasswordInputField id="password" />
          </AuthPasswordInput.AuthPasswordInputWrapper>
          <ConfirmButton>Sign up</ConfirmButton>
        </>
      );
    }
  };

  return <StyledForm>{getFormContent()}</StyledForm>;
};

export default Form;
