import { Input as ChakraInput } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import React from "react";

import {
  WrapperComponentProps,
  withFormikField,
} from "../withFormikField/withFormikField";

/**
 * This component wraps the content of a login input.
 *
 * @example
 * ```tsx
 *  <AuthInputWrapper>
 *    <AuthInputLabel htmlFor="email">Email</AuthInputLabel>
 *    <AuthInputField id="email" />
 *  </AuthInputWrapper>
 * ```
 */
export const AuthInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

/**
 * It is a component that represents a label of the input field.
 * It's intended to be used inside the {@link AuthInput}.
 */
export const AuthInputLabel = styled.label`
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;

/**
 * It is a component that represents an input field.
 * It's intended to be used inside the {@link AuthInput}.
 */
export const AuthInputField = styled(ChakraInput)`
  padding: 1.2em 1em;
  border-color: ${({ theme }) => theme.separators};

  &:focus {
    border-color: ${({ theme }) => theme.focus};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.focus};
  }

  &:focus[aria-invalid="true"] {
    border-color: ${({ theme }) => theme.error};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.error};
  }
`;

/** The {@link AuthInputField} wrapped into the {@link withFormikField}. */
export const FormikAuthInputField = withFormikField(AuthInputField);

export type FormikAuthInputProps = {
  /** A label text. */
  labelText: string;
  /** A name of the input field. */
  name: string;
  /** An id of the input field */
  id: string;
  /** A type of the input field. */
  type?: string;
  /** @see {@link WrapperComponentProps} */
  useFieldImplementation?: WrapperComponentProps["useField"];
};
/**
 * It is a component that combines all the `AuthInput` elements into a single
 * representation of an input field with a label.
 *
 * The input field is wrapped into the {@link withFormikField} HoC and as a
 * result, has the functionality of the `formik`'s `useField` applied.
 */
export const FormikAuthInput = ({
  labelText,
  name,
  id,
  type,
  useFieldImplementation,
}: FormikAuthInputProps) => {
  return (
    <AuthInputWrapper>
      <AuthInputLabel htmlFor={id}>{labelText}</AuthInputLabel>
      <FormikAuthInputField
        name={name}
        id={id}
        type={type}
        useField={useFieldImplementation}
      />
    </AuthInputWrapper>
  );
};
