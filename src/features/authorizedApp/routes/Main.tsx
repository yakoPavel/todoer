import styled from "@emotion/styled/macro";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

import { ErrorFallback } from "../components/ErrorFallback/ErrorFallback";
import { AppHeader } from "../features/AppHeader";
import { Modals } from "../features/Modals";
import { SideMenu } from "../features/SideMenu";

import { PageContentContainer } from "@/features/authorizedApp/features/Page";
import {
  selectors as sideMenuUiSelectors,
  actions as sideMenuUiActions,
} from "@/features/authorizedApp/store/slices/sideMenuUi";
import { useAppSelector, useAppDispatch } from "@/hooks/storeHooks";

function useSideMenuState() {
  const dispatch = useAppDispatch();
  const isSideMenuOpened = useAppSelector(sideMenuUiSelectors.selectIsOpened);

  const toggleSideMenu = () => {
    if (isSideMenuOpened) {
      return dispatch(sideMenuUiActions.closed());
    }
    dispatch(sideMenuUiActions.opened());
  };

  return {
    isSideMenuOpened,
    toggleSideMenu,
  };
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.background};
`;

export const Main = () => {
  const { isSideMenuOpened, toggleSideMenu } = useSideMenuState();

  return (
    <Container>
      <AppHeader
        isSideMenuOpened={isSideMenuOpened}
        onMenuToggle={toggleSideMenu}
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
