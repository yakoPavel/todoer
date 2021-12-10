import "style/global.css";

import React from "react";
import ReactDOM from "react-dom";
import { initializeFirebase } from "utils/initializeFirebase";

import App from "./App";
import AppProviders from "./context";

initializeFirebase();

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root"),
);
