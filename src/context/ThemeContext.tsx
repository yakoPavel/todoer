import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import React from "react";

import * as colorThemes from "../style/colors";
import createContext from "./createContext";

type ColorTheme = "dark" | "light" | "neutral" | "noir" | "orange";

const [useCurrentThemeSetter, CurrentThemeSetterProvider] =
  createContext<React.Dispatch<React.SetStateAction<ColorTheme>>>();

const ThemeContextProvider: React.FC = ({ children }) => {
  const [currentTheme, setCurrentTheme] = React.useState<ColorTheme>("light");

  const themeValue = React.useMemo(
    () => ({
      ...colorThemes[`${currentTheme}Theme`],
      ...createTheme(),
    }),
    [currentTheme],
  );

  return (
    <MuiThemeProvider theme={themeValue}>
      <CurrentThemeSetterProvider value={setCurrentTheme}>
        {children}
      </CurrentThemeSetterProvider>
    </MuiThemeProvider>
  );
};

export default ThemeContextProvider;

export { useCurrentThemeSetter };
