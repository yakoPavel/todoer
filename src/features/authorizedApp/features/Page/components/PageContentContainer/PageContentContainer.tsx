import styled from "@emotion/styled/macro";
import React from "react";

import { selectors as sideMenuUiSelectors } from "@/features/authorizedApp/store/slices/sideMenuUi";
import { useAppSelector } from "@/hooks/storeHooks";

const StyledContainer = styled.div`
  color: ${({ theme }) => theme.text};

  height: calc(100vh - var(--header-height, 0) - 1px);
  transition: margin-left 0.3s;
`;

export const PageContentContainer: React.FC = ({ children }) => {
  const isSideMenuOpened = useAppSelector(sideMenuUiSelectors.selectIsOpened);
  const sideMenuWidth = useAppSelector(sideMenuUiSelectors.selectWidth);

  return (
    <StyledContainer
      style={{
        marginLeft: `${isSideMenuOpened ? sideMenuWidth : 0}px`,
      }}
    >
      {children}
    </StyledContainer>
  );
};
