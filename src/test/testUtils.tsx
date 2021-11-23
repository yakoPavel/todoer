import { render as rtlRender, RenderOptions } from "@testing-library/react";
import AppProviders from "context";
import React from "react";

export type Renderer = (
  ui: React.ReactElement,
  options?: RenderOptions,
) => ReturnType<typeof rtlRender>;

/**
 * Renders specified React element. Additionally, wraps that component into
 * the App providers.
 *
 * @param ui - A react element to be rendered.
 * @param options - Render options.
 */
const render: Renderer = (ui, options = {}) => {
  const Wrapper: React.FC = ({ children }) => (
    <AppProviders>{children}</AppProviders>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...options });
};

export * from "@testing-library/react";
export { render };
export { default as userEvent } from "@testing-library/user-event";
