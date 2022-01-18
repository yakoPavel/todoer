import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "store/store";
import chakraTheme from "style/chakraTheme";
import GlobalDynamicStyles from "style/globalDynamicStyles";
import { initializeFirebase } from "utils/initializeFirebase";

import ThemeContextProvider from "./ThemeContext";
import { UserContextProvider } from "./UserContext";

initializeFirebase();

const AppProviders: React.FC = ({ children }) => {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <GlobalDynamicStyles />
        <ChakraProvider theme={chakraTheme}>
          <UserContextProvider>
            <ReduxProvider store={store}>{children}</ReduxProvider>
          </UserContextProvider>
        </ChakraProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
