import { Input as ChakraInput } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";

/**
 * This component wraps the content of a login input.
 *
 * @example
 * ```tsx
 *  <LoginInputWrapper>
 *    <LoginInputLabel htmlFor="email">Email</LoginInputLabel>
 *    <LoginInputField id="email" />
 *  </LoginInputWrapper>
 * ```
 */
export const LoginInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

/**
 * It is a component that represents a label of the input field.
 * It's intended to be used inside the {@link LoginInputWrapper}.
 */
export const LoginInputLabel = styled.label`
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;

/**
 * It is a component that represents an input field.
 * It's intended to be used inside the {@link LoginInputWrapper}.
 */
export const LoginInputFiled = styled(ChakraInput)`
  padding: 1.2em 1em;
  border-color: ${({ theme }) => theme.separators};

  &:focus {
    border: 1px solid ${({ theme }) => theme.focus};
    box-shadow: none;
  }
`;
