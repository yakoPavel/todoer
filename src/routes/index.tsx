import React from "react";

import useUserContext from "../context/UserContext";
import AuthorizedAppRoutes from "./AuthorizedAppRoutes";
import UnauthorizedAppRoutes from "./UnauthorizedAppRoutes";

const AppRoutes = () => {
  const user = useUserContext();

  if (!user) {
    return <UnauthorizedAppRoutes />;
  }

  return <AuthorizedAppRoutes />;
};

export default AppRoutes;
