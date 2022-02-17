import styled from "@emotion/styled/macro";
import React from "react";

import { selectors as sideMenuUiSelectors } from "@/features/authorizedApp/store/slices/sideMenuUi";
import { useAppSelector } from "@/hooks/storeHooks";

const StyledContainer = styled.div`
  color: ${({ theme }) => theme.text};

  width: 100%;
  height: calc(100vh - var(--header-height, 0) - 1px);
  transition: transform 0.3s;
`;

export const PageContentContainer: React.FC = ({ children }) => {
  const isSideMenuOpened = useAppSelector(sideMenuUiSelectors.selectIsOpened);
  const sideMenuWidth = useAppSelector(sideMenuUiSelectors.selectWidth);

  return (
    <StyledContainer
      style={{
        transform: `translateX(${isSideMenuOpened ? sideMenuWidth / 2 : 0}px)`,
      }}
    >
      {children}
    </StyledContainer>
  );
};
