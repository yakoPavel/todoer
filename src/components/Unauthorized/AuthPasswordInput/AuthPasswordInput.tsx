import styled from "@emotion/styled/macro";
import React from "react";
import { BiHide, BiShow } from "react-icons/bi";

import Tooltip from "../../UI/Tooltip/Tooltip";
import * as AuthInput from "../AuthInput/AuthInput";
import withFormikField from "../withFormikField/withFormikField";

const InputFieldWrapper = styled.div`
  position: relative;
`;

const PasswordVisibilityBtn = styled.button`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.textSecondary};
  z-index: 10;

  &:hover {
    color: ${({ theme }) => theme.textSecondaryActive};
  }
`;

/**
 * This component wraps the content of a password input.
 *
 * @example
 * ```tsx
 *  <AuthPasswordInputWrapper>
 *    <AuthPasswordInputLabel htmlFor="password">Password</AuthPasswordInputLabel>
 *    <AuthLoginInputField id="password" />
 *  </AuthPasswordInputWrapper>
 * ```
 */
const AuthPasswordInputWrapper = AuthInput.AuthInputWrapper;

/**
 * It is a component that represents a label of the input field.
 * It's intended to be used inside the {@link AuthPasswordInputWrapper}.
 */
const AuthPasswordInputLabel = AuthInput.AuthInputLabel;

type AuthPasswordInputFieldProps = React.ComponentProps<
  typeof AuthInput.AuthInputField
>;
/**
 * It is a component that represents a password input field.
 * It's intended to be used inside the {@link AuthPasswordInputWrapper}.
 */
const AuthPasswordInputField = React.forwardRef<
  HTMLInputElement,
  AuthPasswordInputFieldProps
>((props, ref) => {
  const [show, setShow] = React.useState(false);
  const onChangePasswordVisibility = () => setShow(!show);

  return (
    <InputFieldWrapper>
      <AuthInput.AuthInputField
        ref={ref}
        {...props}
        type={show ? "text" : "password"}
      />
      <Tooltip tooltipText={show ? "Hide password" : "Show password"}>
        <PasswordVisibilityBtn
          onClick={onChangePasswordVisibility}
          type="button"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show && <BiShow size={24} />}
          {!show && <BiHide size={24} />}
        </PasswordVisibilityBtn>
      </Tooltip>
    </InputFieldWrapper>
  );
});
AuthPasswordInputField.displayName = "AuthPasswordInputField";

/** The {@link AuthPasswordInputField} wrapped into the {@link withFormikField}. */
const FormikAuthPasswordInput = withFormikField(AuthPasswordInputField);

export {
  AuthPasswordInputField,
  AuthPasswordInputLabel,
  AuthPasswordInputWrapper,
  FormikAuthPasswordInput,
};
