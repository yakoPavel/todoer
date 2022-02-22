import styled from "@emotion/styled/macro";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

import { ErrorFallback } from "../components/ErrorFallback/ErrorFallback";
import { AppHeader } from "../features/AppHeader";
import { Modals } from "../features/Modals";
import { SideMenu } from "../features/SideMenu";

import { useEventHandlers } from "./hooks/useEventHandlers";

import { PageContentContainer } from "@/features/authorizedApp/features/Page";
import { selectors as sideMenuUiSelectors } from "@/features/authorizedApp/store/slices/sideMenuUi";
import { useAppSelector } from "@/hooks/storeHooks";

const Container = styled.div`
  background-color: ${({ theme }) => theme.background};
  height: 100vh;
`;

export const Main = () => {
  const { onThemeChange, onToggleSideMenu, onGoHome, onLogout } =
    useEventHandlers();
  const isSideMenuOpened = useAppSelector(sideMenuUiSelectors.selectIsOpened);

  return (
    <Container>
      <AppHeader
        isSideMenuOpened={isSideMenuOpened}
        onMenuToggle={onToggleSideMenu}
        onThemeChange={onThemeChange}
        onGoHome={onGoHome}
        onLogout={onLogout}
      />
      <SideMenu isOpen={isSideMenuOpened} />
      <PageContentContainer>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Outlet />
        </ErrorBoundary>
      </PageContentContainer>
      <Modals />
    </Container>
  );
};
