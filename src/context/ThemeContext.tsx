import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import React from "react";

import * as colorThemes from "../style/colors";

import { createContext } from "./createContext";

import { ThemeName } from "@/types";

const [useCurrentThemeSetter, CurrentThemeSetterProvider] =
  createContext<React.Dispatch<React.SetStateAction<ThemeName>>>();
const [useCurrentThemeName, CurrentThemeNameProvider] =
  createContext<ThemeName>();

export const ThemeContextProvider: React.FC = ({ children }) => {
  const [currentTheme, setCurrentTheme] = React.useState<ThemeName>("light");

  const themeValue = React.useMemo(
    () => colorThemes[`${currentTheme}Theme`],
    [currentTheme],
  );

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
