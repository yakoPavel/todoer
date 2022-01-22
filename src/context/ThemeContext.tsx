import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import React from "react";

import * as colorThemes from "../style/colors";

import createContext from "./createContext";

type ColorTheme = "dark" | "light" | "neutral" | "noir" | "orange";

const [useCurrentThemeSetter, CurrentThemeSetterProvider] =
  createContext<React.Dispatch<React.SetStateAction<ColorTheme>>>();

const ThemeContextProvider: React.FC = ({ children }) => {
  const [currentTheme, setCurrentTheme] = React.useState<ColorTheme>("light");

  const themeValue = React.useMemo(
    () => colorThemes[`${currentTheme}Theme`],
    [currentTheme],
  );

  return (
    <EmotionThemeProvider theme={themeValue}>
      <CurrentThemeSetterProvider value={setCurrentTheme}>
        {children}
      </CurrentThemeSetterProvider>
    </EmotionThemeProvider>
  );
};

export default ThemeContextProvider;

export { useCurrentThemeSetter };
