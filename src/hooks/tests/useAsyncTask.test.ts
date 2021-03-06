import { act, renderHook } from "@testing-library/react-hooks";

import { useAsyncTask } from "@/hooks/useAsyncTask";
import { getControlledPromise } from "@/test/testUtils";

const defaultState = {
  status: "idle",
  data: null,
  error: null,

  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,

  run: expect.any(Function),
  reset: expect.any(Function),
};

const pendingState = {
  ...defaultState,
  status: "pending",
  isIdle: false,
  isLoading: true,
};

const resolvedState = {
  ...defaultState,
  status: "resolved",
  isIdle: false,
  isSuccess: true,
};

const rejectedState = {
  ...defaultState,
  status: "rejected",
  isIdle: false,
  isError: true,
};

test("correctly works with a task that resolves", async () => {
  const { resolve, promise } = getControlledPromise();

  const { result } = renderHook(() => useAsyncTask(() => promise));
  expect(result.current).toEqual(defaultState);

  act(() => {
    result.current.run();
  });
  expect(result.current).toEqual(pendingState);

  const resolvedValue = "RESOLVED_VALUE";
  await act(async () => {
    resolve(resolvedValue);
    await promise;
  });
  expect(result.current).toEqual({
    ...resolvedState,
    data: resolvedValue,
  });
});

test("correctly works with a task that rejects", async () => {
  const { reject, promise } = getControlledPromise();

  const { result } = renderHook(() => useAsyncTask(() => promise));

  await act(async () => {
    const runPromise = result.current.run().catch(() => {
      /* Ignoring the error */
    });

    reject();

    await runPromise;
  });

  expect(result.current).toEqual({
    ...rejectedState,
    error: expect.any(Error),
  });
});
