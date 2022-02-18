const path = require("path");

const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-a11y",
  ],
  framework: "@storybook/react",
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          // We need this for emotion to work inside storybook
          "@emotion/core": toPath("node_modules/@emotion/react"),
          "@emotion/styled": toPath("node_modules/@emotion/styled"),

          "@/context/UserContext": path.resolve(
            __dirname,
            "../src/context/__mocks__/UserContext",
          ),

          "./hooks/useCorrectLocation": path.resolve(
            __dirname,
            "../src/features/authorizedApp/features/Page/hooks/__mocks__/useCorrectLocation",
          ),

          "@": path.resolve(__dirname, "../src/"),
        },
        extensions: [...config.resolve.extensions, ".ts", ".tsx"],
      },
      plugins: config.plugins.filter((plugin) => {
        if (plugin.constructor.name === "ESLintWebpackPlugin") {
          return false;
        }
        return true;
      }),
    };
  },
};
