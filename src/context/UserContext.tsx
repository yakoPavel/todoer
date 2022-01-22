import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import React from "react";

import { createContext } from "./createContext";

const [useUserContext, ContextProvider] = createContext<User | null>();

export const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);

  const auth = getAuth();

  onAuthStateChanged(auth, setUser);

  return <ContextProvider value={user}>{children}</ContextProvider>;
};

export { useUserContext };
