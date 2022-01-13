export type ThemeColors = {
  [color in
    | "main"
    | "header"
    | "headerSecondary"
    | "headerTertiary"
    | "background"
    | "backgroundSecondary"
    | "backgroundTertiary"
    | "tooltipBackground"
    | "switchBackground"
    | "switchThumb"
    | "modalFormBackground"
    | "modalFormTitleBackground"
    | "separators"
    | "focus"
    | "text"
    | "textSecondary"
    | "textSecondaryActive"
    | "textAlt"
    | "error"
    | "scrollbarBackground"
    | "scrollbarThumb"]: string;
};

export const lightTheme: ThemeColors = {
  main: "#db4c3f",
  header: "#db4c3f",
  headerSecondary: "rgba(255,255,255,0.2)",
  headerTertiary: "rgba(150,150,150,0.2)",
  background: "#ffffff",
  backgroundSecondary: "#fafafa",
  backgroundTertiary: "#eeeeee",
  switchBackground: "#aaaaaa",
  switchThumb: "#ffffff",
  tooltipBackground: "#555555",
  modalFormBackground: "#ffffff",
  modalFormTitleBackground: "#fafafa",
  separators: "#dddddd",
  focus: "#000000",
  text: "#202020",
  textSecondary: "#999999",
  textSecondaryActive: "#555555",
  textAlt: "#ffffff",
  error: "#e8051b",
  scrollbarBackground: "#eeeeee",
  scrollbarThumb: "#aaaaaa",
};

export const noirTheme: ThemeColors = {
  ...lightTheme,
  main: "#3d3d3d",
  header: "#3d3d3d",
};

export const neutralTheme: ThemeColors = {
  ...lightTheme,
  main: "#db4c3f",
  header: "#f7f7f7",
};

export const orangeTheme: ThemeColors = {
  ...lightTheme,
  main: "#ff9000",
  header: "#ff9000",
};

export const darkTheme: ThemeColors = {
  ...lightTheme,
  header: "#282828",
  headerSecondary: "rgba(255,255,255,0.2)",
  headerTertiary: "rgba(150,150,150,0.2)",
  background: "#1e1e1e",
  backgroundSecondary: "#282828",
  backgroundTertiary: "#363636",
  tooltipBackground: "#363636",
  modalFormBackground: "#282828",
  modalFormTitleBackground: "#202020",
  separators: "#333333",
  focus: "#ffffff",
  text: "#eeeeee",
  textSecondary: "#808080",
  textSecondaryActive: "#b2b2b2",
  textAlt: "#eeeeee",
  scrollbarBackground: "#171717",
  scrollbarThumb: "#8b8b8b",
};
