import styled from "@emotion/styled/macro";
import React from "react";
import { BiHide, BiShow } from "react-icons/bi";

import * as LoginInput from "../LoginInput/LoginInput";
import Tooltip from "../Tooltip/Tooltip";

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
 *  <PasswordInputWrapper>
 *    <PasswordInputLabel htmlFor="password">Password</PasswordInputLabel>
 *    <LoginInputField id="password" />
 *  </PasswordInputWrapper>
 * ```
 */
const PasswordInputWrapper = LoginInput.LoginInputWrapper;

/**
 * It is a component that represents a label of the input field.
 * It's intended to be used inside the {@link PasswordInputWrapper}.
 */
const PasswordInputLabel = LoginInput.LoginInputLabel;

type PasswordInputFieldProps = React.ComponentProps<
  typeof LoginInput.LoginInputFiled
>;
/**
 * It is a component that represents a password input field.
 * It's intended to be used inside the {@link LoginInputWrapper}.
 */
const PasswordInputField = React.forwardRef<
  HTMLInputElement,
  PasswordInputFieldProps
>((props, ref) => {
  const [show, setShow] = React.useState(false);
  const onChangePasswordVisibility = () => setShow(!show);

  return (
    <InputFieldWrapper>
      <LoginInput.LoginInputFiled
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
PasswordInputField.displayName = "PasswordInputField";

export { PasswordInputField, PasswordInputLabel, PasswordInputWrapper };
