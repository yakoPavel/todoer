import React from "react";

import { useUserContext } from "../context/UserContext";

import { UnauthorizedAppRoutes as AuthorizedAppRoutes } from "./AuthorizedAppRoutes";
import { UnauthorizedAppRoutes } from "./UnauthorizedAppRoutes";

import { Loading } from "@/components/Loading/Loading";
import { getLabels } from "@/features/authorizedApp/api/getLabels";
import { getProjects } from "@/features/authorizedApp/api/getProjects";
import { useClient } from "@/hooks/useClient";
import { queryClient } from "@/lib/react-query";
import { waitForInitialAuthChecking } from "@/utils/authentication";

function usePrefetchData() {
  const [isDataPrefetched, setIsDataPrefetched] = React.useState(false);

  const client = useClient({ throwIfNotAuthenticated: false });

  React.useEffect(() => {
    if (!client) return;

    Promise.all([
      queryClient.fetchQuery("projects", () => getProjects(client)),
      queryClient.fetchQuery("labels", () => getLabels(client)),
    ])
      .then(() => setIsDataPrefetched(true))
      .catch(() => {
        /* TODO: Remove this catch and let the error boundary to catch the error */
      });
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
