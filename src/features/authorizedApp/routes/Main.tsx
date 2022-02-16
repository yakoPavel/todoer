import React from "react";
import { Outlet } from "react-router-dom";

import { AppHeader } from "../features/AppHeader";
import { Modals } from "../features/Modals";
import { SideMenu } from "../features/SideMenu";

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

export const Main = () => {
  const { isSideMenuOpened, toggleSideMenu } = useSideMenuState();

  return (
    <>
      <AppHeader
        isSideMenuOpened={isSideMenuOpened}
        onMenuToggle={toggleSideMenu}
      />
      <SideMenu isOpen={isSideMenuOpened} />
      <Outlet />
      <Modals />
    </>
  );
};
