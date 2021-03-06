import { AppProviders } from "../src/providers/app";
import "../src/style/global.css";
import { ThemeProvider } from "@emotion/react";
import * as colorThemes from "../src/style/colors";
import { GlobalDynamicStyles } from "../src/style/globalDynamicStyles";
import { initMocks } from "../src/test/server";
import { populateDb } from "../src/test/dataGenerators";
import { resetDb } from "../src/test/server/db";

initMocks();
resetDb();
populateDb({
  numberOfProjects: 12,
  numberOfLabels: 25,
  numberOfFavoriteLabels: 5,
  numberOfFavoriteProjects: 3,
  numberOfTasks: 100,
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
      select: /__theme__/,
    },
    exclude: /(?!_{1,2}theme__)(?<!__theme_?)_.*/,
  },
  layout: "fullscreen",
};

export const decorators = [
  (Story, { args }) => {
    const { __theme__ } = args;

    if (__theme__) {
      return (
        <ThemeProvider theme={colorThemes[__theme__]}>
          <GlobalDynamicStyles />
          <Story />
        </ThemeProvider>
      );
    }

    return <Story />;
  },
  (Story) => {
    return (
      <AppProviders>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Story />
        </div>
      </AppProviders>
    );
  },
];
