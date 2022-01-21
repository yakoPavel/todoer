import "style/global.css";

import React from "react";
import ReactDOM from "react-dom";
import { initMocks } from "test/server";

import App from "./App";
import AppProviders from "./context";

initMocks();

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root"),
);
