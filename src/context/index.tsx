import React from "react";
import { BrowserRouter } from "react-router-dom";

const AppProviders: React.FC = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default AppProviders;
