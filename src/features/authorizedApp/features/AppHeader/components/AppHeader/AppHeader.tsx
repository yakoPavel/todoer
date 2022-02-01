import { useTheme } from "@emotion/react";
import React from "react";
import { IconType } from "react-icons";
import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import {
  IoAddOutline,
  IoColorPaletteOutline,
  IoLogOutOutline,
} from "react-icons/io5";

import { Search } from "../Search/Search";

import * as Styled from "./styles";

import { Tooltip } from "@/components/Tooltip/Tooltip";
import * as keyboardShortcuts from "@/config/keyboardShortcuts";
import { actions as modalActions } from "@/features/authorizedApp/store/slices/modalsUi";
import { useAppDispatch } from "@/hooks/storeHooks";

type HeaderButtonProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "children"
> & {
  tooltipText: string;
  shortcut: string[];
  ButtonIcon: IconType;
};

const HeaderButton = ({
  tooltipText,
  shortcut,
  ButtonIcon,
  ...otherProps
}: HeaderButtonProps): JSX.Element => {
  const themeColors = useTheme();

  return (
    <Tooltip tooltipText={tooltipText} shortcut={shortcut}>
      <Styled.Button type="button" {...otherProps}>
        <ButtonIcon color={themeColors.textAlt} size="2.4rem" />
      </Styled.Button>
    </Tooltip>
  );
};

type AppHeaderProps = {
  onMenuToggle?: () => void;
  onGoHome?: () => void;
  onQuickAdd?: () => void;
  menuState: "opened" | "closed";
};
export const AppHeader = ({
  onMenuToggle,
  onGoHome,
  onQuickAdd,
  menuState,
}: AppHeaderProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const menuButtonLabel =
    menuState === "closed" ? "Open the menu" : "Close the menu";

  const saveHeaderHeight = (header: HTMLElement | null) => {
    if (header === null) return;

    document.documentElement.style.setProperty(
      "--header-height",
      `${header.offsetHeight}px`,
    );
  };

  const onThemeChange = () => {
    dispatch(modalActions.themeSwitcherDialogAppeared());
  };

  return (
    <Styled.Header ref={saveHeaderHeight}>
      <Styled.SectionWrapper>
        <HeaderButton
          tooltipText={menuButtonLabel}
          shortcut={keyboardShortcuts.TOGGLE_MENU}
          aria-label={menuButtonLabel}
          onClick={onMenuToggle}
          ButtonIcon={AiOutlineMenu}
        />
        <HeaderButton
          tooltipText="Go to home"
          shortcut={keyboardShortcuts.TOGGLE_MENU}
          aria-label="Go to home"
          onClick={onGoHome}
          ButtonIcon={AiOutlineHome}
        />
        <Search />
      </Styled.SectionWrapper>

      <Styled.SectionWrapper>
        <HeaderButton
          tooltipText="Quick add"
          shortcut={keyboardShortcuts.QUICK_ADD}
          aria-label="Quick add"
          onClick={onQuickAdd}
          ButtonIcon={IoAddOutline}
        />
        <HeaderButton
          tooltipText="Change the theme"
          shortcut={keyboardShortcuts.THEME}
          aria-label="Change the theme"
          onClick={onThemeChange}
          ButtonIcon={IoColorPaletteOutline}
        />
        <HeaderButton
          tooltipText="Logout"
          shortcut={keyboardShortcuts.LOGOUT}
          aria-label="Logout"
          onClick={onThemeChange}
          ButtonIcon={IoLogOutOutline}
        />
      </Styled.SectionWrapper>
    </Styled.Header>
  );
};
