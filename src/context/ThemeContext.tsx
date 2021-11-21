import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import React from "react";

import * as colorThemes from "../style/colors";

type ColorTheme = "dark" | "light" | "neutral" | "noir" | "orange";

const ThemeContextProvider: React.FC = ({ children }) => {
  const [currentTheme, setCurrentTheme] = React.useState<ColorTheme>("light");

  const themeValue = React.useMemo(
    () => ({
      ...colorThemes[`${currentTheme}Theme`],
      setCurrentTheme,
    }),
    [currentTheme],
  );

  return (
    <EmotionThemeProvider theme={themeValue}>{children}</EmotionThemeProvider>
  );
};

export default ThemeContextProvider;
