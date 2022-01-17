import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";

import { StyledLink } from "../MenuLink/MenuLink";
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

export const NumberOfItemsText = styled(Text)`
  color: ${({ theme }) => theme.textSecondary};

  ${StyledLink}:hover & {
    visibility: hidden;
  }
`;

/* Three dots component that triggers the popup */

export const PopupTriggerWrapper = styled.div`
  position: relative;
`;

export const PopupTrigger = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  visibility: hidden;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 2rem;

  ${StyledLink}:hover & {
    visibility: visible;
  }

  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;
