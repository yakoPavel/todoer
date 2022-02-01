import { User } from "firebase/auth";
import React from "react";

import { createContext } from "../createContext";

const [useUserContext, ContextProvider] = createContext<User | null>();

export const UserContextProvider: React.FC = ({ children }) => {
  const dummyUser = {
    getIdToken: async () => Promise.resolve("DUMMY_TOKEN"),
  } as User;

  return <ContextProvider value={dummyUser}>{children}</ContextProvider>;
};

export { useUserContext };
