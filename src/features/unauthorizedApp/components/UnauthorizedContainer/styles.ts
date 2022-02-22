import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";

import * as mediaQueries from "@/style/mediaQueries";

/**
 * The top-most wrapper.
 */
export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: min-content;
  min-height: min-content;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

/**
 *  A card that wraps the main and the decorative content.
 */
export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;

  &.alignToTop {
    align-self: flex-start;
  }

  ${mediaQueries.md} {
    flex-direction: row;
  }
`;

/**
 * A component that wraps the actual main content.
 */
export const ContentWrapper = styled.main`
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

/* Brand decorative section */

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
