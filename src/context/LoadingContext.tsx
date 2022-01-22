import React from "react";

import { createContext } from "./createContext";

type LoadingState = {
  /** Whether or not the screen in the loading state. */
  isScreenLoading: boolean;
  /** Sets the loading state of the screen. */
  setIsScreenLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
const [useLoadingState, ContextProvider] = createContext<LoadingState>();

export const LoadingStateContextProvider: React.FC = ({ children }) => {
  const [isScreenLoading, setIsScreenLoading] = React.useState(false);

  return (
    <ContextProvider value={{ isScreenLoading, setIsScreenLoading }}>
      {children}
    </ContextProvider>
  );
};

export { useLoadingState };
