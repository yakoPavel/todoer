import React from "react";

/**
 * A helper for a creation of a Context and a Provider with no upfront
 * default value and without having to check for undefined all the time.
 */
export const createContext = <A>() => {
  const context = React.createContext<A | undefined>(undefined);
  const useContext = () => {
    const c = React.useContext(context);
    if (c === undefined) {
      throw new Error("useContext must be inside a Provider with a value");
    }
    return c;
  };
  return [useContext, context.Provider, context] as const;
};
