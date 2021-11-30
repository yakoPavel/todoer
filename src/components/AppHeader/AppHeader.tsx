import { useTheme } from "@emotion/react";
import Tooltip from "components/UI/Tooltip/Tooltip";
import * as keyboardShortcuts from "constants/keyboardShortcuts";
import React from "react";
import { IconType } from "react-icons";
import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import {
  IoAddOutline,
  IoColorPaletteOutline,
  IoLogOutOutline,
} from "react-icons/io5";

import Search from "./Search/Search";
import * as Styled from "./styles";

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
  onThemeChange?: () => void;
  menuState: "opened" | "closed";
};
const AppHeader = ({
  onMenuToggle,
  onGoHome,
  onQuickAdd,
  onThemeChange,
  menuState,
}: AppHeaderProps): JSX.Element => {
  const menuButtonLabel =
    menuState === "closed" ? "Open the menu" : "Close the menu";

  return (
    <Styled.Header>
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

export default AppHeader;
