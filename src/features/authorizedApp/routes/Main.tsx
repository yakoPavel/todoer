import React from "react";

import { getLabels } from "../api/getLabels";
import { getProjects } from "../api/getProjects";
import { AppHeader } from "../features/AppHeader";
import { Modals } from "../features/Modals";
import { SideMenu } from "../features/SideMenu";

import { Loading } from "@/components/Loading/Loading";
import { useClient } from "@/hooks/useClient";
import { queryClient } from "@/lib/react-query";
import { waitForInitialAuthChecking } from "@/utils/authentication";

function useLoadingState() {
  const [isAuthChecked, setIsAuthChecked] = React.useState(false);
  const [isDataLoaded, setIsDataLoaded] = React.useState(false);

  const client = useClient();

  React.useEffect(() => {
    waitForInitialAuthChecking().then(() => setIsAuthChecked(true));
  }, []);

  React.useEffect(() => {
    if (!isAuthChecked) return;

    Promise.all([
      queryClient.fetchQuery("projects", () => getProjects(client)),
      queryClient.fetchQuery("labels", () => getLabels(client)),
    ])
      .then(() => setIsDataLoaded(true))
      .catch(() => {
        /* TODO: Remove this catch and let the error boundary to catch the error */
      });
  }, [isAuthChecked, client]);

  return !isAuthChecked || !isDataLoaded;
}

export const Main = () => {
  const [menuState, setMenuState] = React.useReducer(
    (currentState: "opened" | "closed") =>
      currentState === "opened" ? "closed" : "opened",
    "closed",
  );

  const isLoading = useLoadingState();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <AppHeader menuState={menuState} onMenuToggle={setMenuState} />
      <SideMenu isOpen={menuState === "opened"} />
      <Modals />
    </>
  );
};
