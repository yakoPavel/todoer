import React from "react";

type State<Data> = {
  /** The status of the task. */
  status: "idle" | "pending" | "rejected" | "resolved";
  /** The returned data. */
  data: Data | null;
  /** The error that occurred during the last task run. */
  error: Error | null;
};

const defaultInitialState = {
  status: "idle",
  data: null,
  error: null,
} as const;

/**
 * Keeps track of the state of the async task passed as an argument.
 *
 * @param task - An async task to keep track. It is advisable to memoize
 * it if it's not stable.
 * @param initialState - An initial state.
 *
 * @example
 * ```ts
 * const { isLoading, isError, isSuccess, run, data } = useAsyncTask(fetchData);
 * ```
 */
export function useAsyncTask<Arguments extends unknown[], Return = unknown>(
  task: (...args: Arguments) => Promise<Return>,
  initialState: State<Return> = defaultInitialState,
) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  });
  const [{ status, data, error }, setState] = React.useReducer(
    (state: State<Return>, newState: Partial<State<Return>>) => ({
      ...state,
      ...newState,
    }),
    initialStateRef.current,
  );

  const setData = React.useCallback(
    (newData: Return) => setState({ data: newData, status: "resolved" }),
    [],
  );
  const setError = React.useCallback(
    (newError: Error) => setState({ error: newError, status: "rejected" }),
    [setState],
  );
  const reset = React.useCallback(
    () => setState(initialStateRef.current),
    [setState],
  );

  const run = React.useCallback(
    async (...arg: Arguments) => {
      setState({ status: "pending" });
      try {
        const returnData: Return = await task(...arg);
        setData(returnData);
        return returnData;
      } catch (e) {
        setError(e instanceof Error ? e : Error("Unknown error"));
      }
    },
    [task, setData, setError],
  );

  return {
    isIdle: status === "idle",
    isLoading: status === "pending",
    isError: status === "rejected",
    isSuccess: status === "resolved",

    run,
    status,
    error,
    data,
    reset,
  };
}
