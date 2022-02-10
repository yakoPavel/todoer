import React from "react";

import { useUserContext } from "../context/UserContext";

import { UnauthorizedAppRoutes as AuthorizedAppRoutes } from "./AuthorizedAppRoutes";
import { UnauthorizedAppRoutes } from "./UnauthorizedAppRoutes";

import { Loading } from "@/components/Loading/Loading";
import { useClient } from "@/hooks/useClient";
import { waitForInitialAuthChecking } from "@/utils/authentication";
import { prefetchData } from "@/utils/prefetchData";

function usePrefetchData() {
  const [isDataPrefetched, setIsDataPrefetched] = React.useState(false);

  const client = useClient({ throwIfNotAuthenticated: false });

  React.useEffect(() => {
    if (!client) return;

    prefetchData(client).then(() => setIsDataPrefetched(true));
  }, [client]);

  return isDataPrefetched;
}

function useWaitForInitialAuthChecking() {
  const [isAuthChecked, setIsAuthChecked] = React.useState(false);

  React.useEffect(() => {
    waitForInitialAuthChecking().then(() => setIsAuthChecked(true));
  }, []);

  return isAuthChecked;
}

export const AppRoutes = () => {
  const user = useUserContext();
  const isAuthChecked = useWaitForInitialAuthChecking();
  const isDataPrefetched = usePrefetchData();

  if (!isAuthChecked || (user && !isDataPrefetched)) {
    return <Loading />;
  }

  if (!user) {
    return <UnauthorizedAppRoutes />;
  }

  return <AuthorizedAppRoutes />;
};
