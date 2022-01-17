import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import chakraTheme from "style/chakraTheme";
import GlobalDynamicStyles from "style/globalDynamicStyles";
import { initializeFirebase } from "utils/initializeFirebase";

import ThemeContextProvider from "./ThemeContext";
import { UiStateContextProvider } from "./UiStateContext";
import { UserContextProvider } from "./UserContext";

initializeFirebase();

const AppProviders: React.FC = ({ children }) => {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <GlobalDynamicStyles />
        <ChakraProvider theme={chakraTheme}>
          <UiStateContextProvider>
            <UserContextProvider>{children}</UserContextProvider>
          </UiStateContextProvider>
        </ChakraProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
