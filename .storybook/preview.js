import AppProviders from "../src/context";
import "../src/style/global.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    exclude: /_.*/,
  },
  layout: "fullscreen",
};

export const decorators = [
  (Story) => {
    return (
      <AppProviders>
        <Story />
      </AppProviders>
    );
  },
];
