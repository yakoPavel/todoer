import { Input as ChakraInput, Text } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import * as mediaQueries from "style/mediaQueries";

export const AuthProviderButton = styled.button`
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

  &:hover {
    background-color: ${({ theme }) => theme.headerTertiary};
  }

  &:focus {
    outline-color: ${({ theme }) => theme.focus};
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

/* Email-password form */

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const Label = styled.label`
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;

export const Input = styled(ChakraInput)`
  padding: 1.2em 1em;
  border-color: ${({ theme }) => theme.separators};

  &:focus {
    border: 1px solid ${({ theme }) => theme.focus};
    box-shadow: none;
  }
`;

export const PasswordInputWrapper = styled.div`
  position: relative;
`;

export const PasswordVisibilityBtn = styled.button`
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

/* Brand section */

export const Logo = styled.img`
  max-width: 100%;
  width: 8rem;
`;

export const Slogan = styled(Text)`
  display: none;
  font-size: 2rem;
  margin-top: 1rem;

  ${mediaQueries.md} {
    display: unset;
  }
`;

export const BrandSection = styled.div`
  padding: 2em;
  background-color: ${({ theme }) => theme.main};
  color: ${({ theme }) => theme.textAlt};
  display: flex;
  justify-content: center;
  align-items: center;

  ${mediaQueries.sm} {
    border-radius: 5px 5px 0 0;
  }

  ${mediaQueries.md} {
    flex-direction: column;
    border-radius: 5px 0 0 5px;
  }
`;

/* Containers */

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  width: clamp(25rem, 40rem, 100vw);
  font-size: 1.5rem;
  white-space: nowrap;

  ${mediaQueries.preSm} {
    font-size: 1.6rem;
  }

  ${mediaQueries.sm} {
    padding: 2em;
    border: 1px solid ${({ theme }) => theme.separators};
    border-radius: 0 0 5px 5px;
  }

  ${mediaQueries.md} {
    border-left: none;
    border-radius: 0 5px 5px 0;
  }
`;

export const ContentWrapper = styled.main`
  display: flex;
  flex-direction: column;

  ${mediaQueries.md} {
    flex-direction: row;
  }
`;

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: min-content;
  min-height: min-content;

  ${mediaQueries.sm} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
