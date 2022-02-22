import styled from "@emotion/styled/macro";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

import { ErrorFallback } from "../ErrorFallback/ErrorFallback";

import { useEventHandlers } from "./hooks/useEventHandlers";
import { useProcessShortcuts } from "./hooks/useProcessShortcuts";

import { AppHeader } from "@/features/authorizedApp/features/AppHeader";
import { Modals } from "@/features/authorizedApp/features/Modals";
import { PageContentContainer } from "@/features/authorizedApp/features/Page";
import { SideMenu } from "@/features/authorizedApp/features/SideMenu";
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

  useProcessShortcuts();

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
