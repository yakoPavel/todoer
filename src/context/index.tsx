import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import chakraTheme from "style/chakraTheme";
import { initializeFirebase } from "utils/initializeFirebase";

import ThemeContextProvider from "./ThemeContext";
import { UserContextProvider } from "./UserContext";

initializeFirebase();

const AppProviders: React.FC = ({ children }) => {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <ChakraProvider theme={chakraTheme}>
          <UserContextProvider>{children}</UserContextProvider>
        </ChakraProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
