import React from "react";

import AppHeader from "../features/AppHeader";
import { Modals } from "../features/Modals";
import { SideMenu } from "../features/SideMenu";

const Main = () => {
  const [menuState, setMenuState] = React.useReducer(
    (currentState: "opened" | "closed") =>
      currentState === "opened" ? "closed" : "opened",
    "closed",
  );

  return (
    <>
      <AppHeader menuState={menuState} onMenuToggle={setMenuState} />
      <SideMenu isOpen={menuState === "opened"} />
      <Modals />
    </>
  );
};

export default Main;
