import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import chakraTheme from "style/chakraTheme";

import ThemeContextProvider from "./ThemeContext";

const AppProviders: React.FC = ({ children }) => {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <ChakraProvider theme={chakraTheme}>{children}</ChakraProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
