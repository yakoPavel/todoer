import styled from "@emotion/styled/macro";

import MenuSection from "../MenuSection/MenuSection";

export const MenuWrapper = styled.section`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.backgroundSecondary};
  width: 100%;
  height: calc(100vh - var(--header-height, 0px));
  padding-top: 3rem;
  padding-left: 3.5rem;
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
