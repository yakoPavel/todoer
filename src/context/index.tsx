import React from "react";
import { BrowserRouter } from "react-router-dom";

import ThemeContextProvider from "./ThemeContext";

const AppProviders: React.FC = ({ children }) => {
  return (
    <BrowserRouter>
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
