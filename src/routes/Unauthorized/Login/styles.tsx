import styled from "@emotion/styled/macro";
import Divider from "components/UI/Divider/Divider";
import StyledLink from "components/UI/StyledLink/StyledLink";
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

export const ForgotPasswordLink = styled(StyledLink)`
  display: block;
  margin-top: 1.5rem;
  color: ${({ theme }) => theme.textSecondaryActive};
` as typeof StyledLink;

export const BottomDivider = styled(Divider)`
  margin: 2rem 0;
`;
