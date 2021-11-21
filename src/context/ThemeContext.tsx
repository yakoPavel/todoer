import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import React from "react";

import * as colorThemes from "../style/colors";

type ColorTheme = "dark" | "light" | "neutral" | "noir" | "orange";

const ThemeContextProvider: React.FC = ({ children }) => {
  const [currentTheme, setCurrentTheme] = React.useState<ColorTheme>("light");

  const themeValue = React.useMemo(
    () => ({
      ...colorThemes[`${currentTheme}Theme`],
      ...createTheme(),
      setCurrentTheme,
    }),
    [currentTheme],
  );

  return <MuiThemeProvider theme={themeValue}>{children}</MuiThemeProvider>;
};

export default ThemeContextProvider;
