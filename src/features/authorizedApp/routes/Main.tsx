import React from "react";

import AppHeader from "../features/AppHeader";

const Main = () => {
  const [menuState, setMenuState] = React.useReducer(
    (currentState: "opened" | "closed") =>
      currentState === "opened" ? "closed" : "opened",
    "closed",
  );

  return <AppHeader menuState={menuState} onMenuToggle={setMenuState} />;
};

export default Main;
