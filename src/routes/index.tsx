import React from "react";

import useUserContext from "../context/UserContext";

import AuthorizedAppRoutes from "./AuthorizedAppRoutes";
import UnauthorizedAppRoutes from "./UnauthorizedAppRoutes";

import Loading from "@/components/Loading/Loading";
import { waitForInitialAuthChecking } from "@/utils/authentication";

const AppRoutes = () => {
  const user = useUserContext();
  const [initialAuthChecking, setInitialAuthChecking] = React.useState(true);

  React.useEffect(() => {
    waitForInitialAuthChecking().then(() => setInitialAuthChecking(false));
  }, []);

  if (initialAuthChecking) {
    return <Loading />;
  }

  if (!user) {
    return <UnauthorizedAppRoutes />;
  }

  return <AuthorizedAppRoutes />;
};

export default AppRoutes;
