import { useTheme } from "@emotion/react";
import React from "react";
import { IconType } from "react-icons";
import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import { IoColorPaletteOutline, IoLogOutOutline } from "react-icons/io5";

import { Search } from "../Search/Search";

import * as Styled from "./styles";

import { Tooltip } from "@/components/Tooltip/Tooltip";
import * as keyboardShortcuts from "@/config/keyboardShortcuts";

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
  onMenuToggle: () => void;
  onGoHome: () => void;
  onThemeChange: () => void;
  onLogout: () => void;
  isSideMenuOpened: boolean;
};
export const AppHeader = ({
  onMenuToggle,
  onGoHome,
  onThemeChange,
  onLogout,
  isSideMenuOpened: isOpened,
}: AppHeaderProps): JSX.Element => {
  const menuButtonLabel = isOpened ? "Close the menu" : "Open the menu";

  const saveHeaderHeight = (header: HTMLElement | null) => {
    if (header === null) return;

    document.documentElement.style.setProperty(
      "--header-height",
      `${header.offsetHeight}px`,
    );
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
          shortcut={keyboardShortcuts.GO_HOME}
          aria-label="Go to home"
          onClick={onGoHome}
          ButtonIcon={AiOutlineHome}
        />
        <Search />
      </Styled.SectionWrapper>

      <Styled.SectionWrapper>
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
          onClick={onLogout}
          ButtonIcon={IoLogOutOutline}
        />
      </Styled.SectionWrapper>
    </Styled.Header>
  );
};
