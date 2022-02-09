// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { setLogger } from "react-query";

import { queryClient } from "@/lib/react-query";
import { resetDb } from "@/test/server/db";
import { server } from "@/test/server/server";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

afterEach(async () => {
  queryClient.clear();
  resetDb();
});

beforeAll(() => {
  setLogger({
    log: console.log,
    warn: console.warn,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    error: () => {},
  });
});

beforeAll(() => {
  Object.defineProperties(global, {
    matchMedia: {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    },
    ResizeObserver: {
      value: class ResizeObserver {
        observe = jest.fn();
        unobserve = jest.fn();
      },
    },
    DOMRect: {
      value: {
        fromRect: () => ({
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: 0,
          height: 0,
        }),
      },
    },
  });
});
