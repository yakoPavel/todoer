module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
    "jest/globals": true,
    "cypress/globals": true,
  },
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "plugin:jest-dom/recommended",
    "plugin:testing-library/react",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",
    "plugin:cypress/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "sonarjs",
    "jest",
    "jest-dom",
    "testing-library",
    "cypress",
  ],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "no-use-before-define": "off",
    "arrow-body-style": "off",
    "consistent-return": "off",

    "sonarjs/cognitive-complexity": ["warn", 15],

    "import/extensions": [
      "error",
      "never",
      {
        json: "always",
      },
    ],
    "import/no-unresolved": 2,
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "import/prefer-default-export": "off",
    "import/no-named-as-default-member": "off",
    "import/no-named-as-default": "off",
    "import/namespace": ["error", { allowComputed: true }],

    "react/jsx-props-no-spreading": "off",
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".jsx", ".tsx"],
      },
    ],
    "react/require-default-props": "off",
    "react/prop-types": "off",
    "react/function-component-definition": [
      "warn",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],

    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
  overrides: [
    {
      files: ["src/test/**", "**/__tests__/**", "**/tests/**", "types.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
    {
      files: ["src/test/**", "jest.setup.ts", "**/__tests__/**", "**/tests/**"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
    {
      files: ["**/*.stories.*"],
      rules: {
        "import/no-anonymous-default-export": "off",
        "import/no-extraneous-dependencies": "off",
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
    {
      files: "cypress/**",
      rules: {
        "jest/expect-expect": "off",
        "jest/valid-expect": "off",
        "jest/valid-expect-in-promise": "off",
        "jest/no-export": "off",
      },
    },
  ],
};
