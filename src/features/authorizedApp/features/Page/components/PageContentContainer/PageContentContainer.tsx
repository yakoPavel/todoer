import styled from "@emotion/styled/macro";
import React from "react";

import { selectors as sideMenuUiSelectors } from "@/features/authorizedApp/store/slices/sideMenuUi";
import { useAppSelector } from "@/hooks/storeHooks";
import { useMedia } from "@/hooks/useMedia";

const StyledContainer = styled.div`
  color: ${({ theme }) => theme.text};

  height: calc(100vh - var(--header-height, 0) - 1px);
  transition: margin-left 0.3s;
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const PageContentContainer: React.FC = ({ children }) => {
  const isSideMenuOpened = useAppSelector(sideMenuUiSelectors.selectIsOpened);
  const sideMenuWidth = useAppSelector(sideMenuUiSelectors.selectWidth);

  const isSmallScreen = useMedia("(max-width: 48em)");

  return (
    <StyledContainer
      style={{
        marginLeft: `${
          isSideMenuOpened && !isSmallScreen ? sideMenuWidth : 0
        }px`,
      }}
    >
      {children}
      {isSideMenuOpened && isSmallScreen && <Overlay />}
    </StyledContainer>
  );
};
