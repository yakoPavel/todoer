/* eslint-disable import/export */
import {
  render as rtlRender,
  RenderOptions,
  waitFor,
} from "@testing-library/react";
import React from "react";

import { queryClient } from "@/lib/react-query";
import { TestingProviders } from "@/providers/testing";

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
    <TestingProviders>{children}</TestingProviders>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...options });
};

/**
 * Returns a promise and its `resolve` and `reject` functions through which
 * we can change its state in the right moment.
 */
function getControlledPromise() {
  let resolve!: (value: unknown) => void;
  let reject!: (reason?: unknown) => void;

  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

/**
 * Ensures that the function is a mock.
 *
 * @param fn - A function to check.
 */
function isMockFunction(fn: (...args: any[]) => any): asserts fn is jest.Mock {
  if (!jest.isMockFunction(fn)) {
    throw new Error(`${fn.name} is not a mock!`);
  }
}

/**
 * Waits until all API calls through the `use-query` are finished.
 */
async function waitForApiCallsFinish() {
  await waitFor(
    () => {
      if (queryClient.isFetching() !== 0 || queryClient.isMutating() !== 0)
        throw new Error();
    },
    { timeout: 10_000 },
  );
}

export * from "@testing-library/react";
export { getControlledPromise, isMockFunction, waitForApiCallsFinish, render };
export { default as userEvent } from "@testing-library/user-event";
