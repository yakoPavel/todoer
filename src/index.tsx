import "style/global.css";

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import AppProviders from "./context";

if (process.env.NODE_ENV === "development") {
  import("test/server/devServer").then(({ server }) => server.start());
}

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root"),
);
