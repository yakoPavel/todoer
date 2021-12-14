import { keyframes } from "@emotion/react/macro";
import styled from "@emotion/styled/macro";
import React from "react";
import { BsApple, BsFacebook, BsGoogle } from "react-icons/bs";
import * as mediaQueries from "style/mediaQueries";

const loadingAnimation = keyframes`
  from {
    background-position: 0 0;
  }

  to {
    background-position: 100% 0;
  }
`;

export const StyledButton = styled.button`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.separators};
  border-radius: 5px;
  padding: 1em 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  & svg {
    margin-right: 1rem;
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.headerTertiary};
  }

  &:focus {
    outline-color: ${({ theme }) => theme.focus};
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:disabled {
    background-image: linear-gradient(
      125deg,
      transparent 8%,
      ${({ theme }) => theme.separators} 18%,
      transparent 33%
    );
    background-size: 300% 300%;
    animation: ${loadingAnimation} 1s linear infinite;
  }

  ${mediaQueries.sm} {
    & svg {
      position: absolute;
      top: 50%;
      left: 1.3em;
      transform: translateY(-50%);
    }
  }
`;

type AuthProviderButtonProps = Omit<
  React.ComponentProps<"button">,
  "children"
> & {
  /** A button variant. */
  variant: "apple" | "facebook" | "google";
  /** Whether or not the button in the loading state. */
  isLoading?: boolean;
};

const AuthProviderButton = ({
  variant,
  isLoading = false,
  ...otherProps
}: AuthProviderButtonProps) => {
  const Icon =
    // eslint-disable-next-line no-nested-ternary
    variant === "apple"
      ? BsApple
      : variant === "facebook"
      ? BsFacebook
      : BsGoogle;

  return (
    <StyledButton disabled={isLoading} type="button" {...otherProps}>
      <Icon size={24} /> Continue with{" "}
      {variant[0].toUpperCase() + variant.slice(1)}
    </StyledButton>
  );
};

export default AuthProviderButton;
