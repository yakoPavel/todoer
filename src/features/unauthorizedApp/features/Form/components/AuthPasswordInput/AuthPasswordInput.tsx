import styled from "@emotion/styled/macro";
import React from "react";
import { BiHide, BiShow } from "react-icons/bi";

import * as AuthInput from "../AuthInput/AuthInput";
import { FormikAuthInputProps } from "../AuthInput/AuthInput";
import withFormikField from "../withFormikField/withFormikField";

import Tooltip from "@/components/Tooltip/Tooltip";

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
const FormikAuthPasswordInputField = withFormikField(AuthPasswordInputField);

type FormikAuthPasswordInputProps = FormikAuthInputProps;
/**
 * It is a component that combines all the `AuthPasswordInput` elements into
 * a single representation of a password-input field with a label.
 *
 * The input field is wrapped into the {@link withFormikField} HoC and as a
 * result, has the functionality of the `formik`'s `useField` applied.
 */
const FormikAuthPasswordInput = ({
  labelText,
  name,
  id,
  type,
  useFieldImplementation,
}: FormikAuthPasswordInputProps) => {
  return (
    <AuthPasswordInputWrapper>
      <AuthPasswordInputLabel htmlFor={id}>{labelText}</AuthPasswordInputLabel>
      <FormikAuthPasswordInputField
        name={name}
        id={id}
        type={type}
        useField={useFieldImplementation}
      />
    </AuthPasswordInputWrapper>
  );
};

export {
  AuthPasswordInputField,
  AuthPasswordInputLabel,
  AuthPasswordInputWrapper,
  FormikAuthPasswordInput,
  FormikAuthPasswordInputField,
};
