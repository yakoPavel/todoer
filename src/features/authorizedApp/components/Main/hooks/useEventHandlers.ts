import React from "react";
import { useNavigate } from "react-router-dom";

import { actions as modalActions } from "@/features/authorizedApp/store/slices/modalsUi";
import {
  selectors as sideMenuUiSelectors,
  actions as sideMenuUiActions,
} from "@/features/authorizedApp/store/slices/sideMenuUi";
import { useAppSelector, useAppDispatch } from "@/hooks/storeHooks";

export function useEventHandlers() {
  const isSideMenuOpened = useAppSelector(sideMenuUiSelectors.selectIsOpened);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onThemeChange = React.useCallback(() => {
    dispatch(modalActions.themeSwitcherDialogAppeared());
  }, [dispatch]);

  const onToggleSideMenu = React.useCallback(() => {
    if (isSideMenuOpened) {
      return dispatch(sideMenuUiActions.closed());
    }
    dispatch(sideMenuUiActions.opened());
  }, [dispatch, isSideMenuOpened]);

  const onLogout = React.useCallback(() => {
    dispatch(modalActions.logoutDialogAppeared());
  }, [dispatch]);

  const onGoHome = React.useCallback(() => {
    if (window.location.pathname !== "/") navigate("/");
  }, [navigate]);

  return {
    onThemeChange,
    onToggleSideMenu,
    onGoHome,
    onLogout,
  };
}
