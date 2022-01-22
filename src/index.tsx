import "@/style/global.css";

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import AppProviders from "./providers/app";

import { initMocks } from "@/test/server";

initMocks();

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root"),
);
