import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import React from "react";

import * as colorThemes from "../style/colors";

import { createContext } from "./createContext";

import { THEME } from "@/config/localStorage";
import { ThemeName } from "@/types";
import * as localStorage from "@/utils/localStorage";

const [useCurrentThemeSetter, CurrentThemeSetterProvider] =
  createContext<(theme: ThemeName) => void>();
const [useCurrentThemeName, CurrentThemeNameProvider] =
  createContext<ThemeName>();

export const ThemeContextProvider: React.FC = ({ children }) => {
  const [currentTheme, originalSetCurrentTheme] = React.useState<ThemeName>(
    () => {
      return localStorage.getFromLocalStorage(THEME, "light" as ThemeName);
    },
  );

  const themeValue = React.useCallback(
    () => colorThemes[`${currentTheme}Theme`],
    [currentTheme],
  );

  const setCurrentTheme = React.useCallback((theme: ThemeName) => {
    originalSetCurrentTheme(theme);
    localStorage.saveToLocalStorage(THEME, theme);
  }, []);

  return (
    <EmotionThemeProvider theme={themeValue}>
      <CurrentThemeSetterProvider value={setCurrentTheme}>
        <CurrentThemeNameProvider value={currentTheme}>
          {children}
        </CurrentThemeNameProvider>
      </CurrentThemeSetterProvider>
    </EmotionThemeProvider>
  );
};

export { useCurrentThemeSetter };
export { useCurrentThemeName };
