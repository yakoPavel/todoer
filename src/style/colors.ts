export type ThemeColors = {
  [color in
    | "main"
    | "header"
    | "headerAlt"
    | "background"
    | "backgroundSecondary"
    | "backgroundTertiary"
    | "tooltipBackground"
    | "text"
    | "textSecondary"
    | "textSecondaryActive"
    | "textAlt"]: string;
};

export const lightTheme: ThemeColors = {
  main: "#db4c3f",
  header: "#db4c3f",
  headerAlt: "rgba(255,255,255,0.2)",
  background: "#ffffff",
  backgroundSecondary: "#fafafa",
  backgroundTertiary: "#eeeeee",
  tooltipBackground: "#555555",
  text: "#202020",
  textSecondary: "#999999",
  textSecondaryActive: "#555555",
  textAlt: "#ffffff",
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
  main: "#db4c3f",
  header: "#282828",
  headerAlt: "rgba(255,255,255,0.2)",
  background: "#1e1e1e",
  backgroundSecondary: "#282828",
  backgroundTertiary: "#363636",
  tooltipBackground: "#363636",
  text: "#eeeeee",
  textSecondary: "#808080",
  textSecondaryActive: "#b2b2b2",
  textAlt: "#eeeeee",
};
