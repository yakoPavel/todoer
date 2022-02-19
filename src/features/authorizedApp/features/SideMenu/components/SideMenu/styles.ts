import styled from "@emotion/styled/macro";

import { MenuSection } from "../MenuSection/MenuSection";

import * as mediaQueries from "@/style/mediaQueries";

export const MenuWrapper = styled.div`
  width: 100%;
  height: calc(100vh - var(--header-height, 0px));
`;

export const MenuContentWrapperOuter = styled.div`
  width: calc(100% - 0.5rem);
  background-color: ${({ theme }) => theme.backgroundSecondary};
  overflow: hidden;

  @media (hover: hover) {
    &:hover {
      overflow-y: auto;
    }
  }
  @media (hover: none) {
    overflow-y: auto;
  }
`;

export const MenuContentWrapperInner = styled.section`
  color: ${({ theme }) => theme.text};
  width: 100%;
  padding-top: 3rem;
  padding-left: 2rem;

  ${mediaQueries.sm} {
    padding-top: 3rem;
    padding-left: 3.5rem;
  }
`;

export const StyledMenuSection = styled(MenuSection)`
  &:not(:last-child) {
    margin-bottom: 3rem;
  }
`;

export const StyledButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.textSecondary};
  padding: 0.3rem;
  border-radius: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundTertiary};
    color: ${({ theme }) => theme.textSecondaryActive};
  }
`;
