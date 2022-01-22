import styled from "@emotion/styled/macro";
import React from "react";
import tinyColor from "tinycolor2";

/**
 * Slightly adjusts the color according to its lightness or darkness to the
 * opposite direction.
 */
function getShiftedColor(initialColor: string) {
  const color = tinyColor(initialColor);

  if (color.isLight()) return color.darken().toHexString();
  return color.lighten().toHexString();
}

const PrimaryButton = styled.button`
  background-color: ${({ theme }) => theme.main};
  color: ${({ theme }) => theme.textAlt};
  font-size: 1.3rem;
  padding: 0.6em 1em;
  border: 1px solid ${({ theme }) => theme.main};
  border-radius: 5px;
  transition: background-color 0.2s linear;

  &:not(:disabled):hover {
    background-color: ${({ theme }) => getShiftedColor(theme.main)};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) =>
      tinyColor(theme.main).desaturate(30).toHexString()};
    color: ${({ theme }) =>
      tinyColor(theme.textAlt).desaturate(30).toHexString()};
    border-color: ${({ theme }) =>
      tinyColor(theme.main).desaturate(30).toHexString()};
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.separators};

  &:not(:disabled):hover {
    background-color: ${({ theme }) => getShiftedColor(theme.background)};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) =>
      tinyColor(theme.background).desaturate(30).toHexString()};
    color: ${({ theme }) => tinyColor(theme.text).desaturate(30).toHexString()};
    border-color: ${({ theme }) => theme.separators};
  }
`;

type ButtonProps = React.ComponentProps<"button"> & {
  /** A variant of the button. */
  variant?: "primary" | "secondary";
};

/**
 * It is a styled button.
 */
export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  ...otherProps
}) => {
  if (variant === "primary") return <PrimaryButton {...otherProps} />;
  return <SecondaryButton {...otherProps} />;
};
