import React from "react";

import { useUserContext } from "../context/UserContext";

import { UnauthorizedAppRoutes as AuthorizedAppRoutes } from "./AuthorizedAppRoutes";
import { UnauthorizedAppRoutes } from "./UnauthorizedAppRoutes";

export const AppRoutes = () => {
  const user = useUserContext();

  if (!user) {
    return <UnauthorizedAppRoutes />;
  }

  return <AuthorizedAppRoutes />;
};
