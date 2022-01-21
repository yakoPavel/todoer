import { ChakraProvider } from "@chakra-ui/react";
import ThemeContextProvider from "context/ThemeContext";
import { UserContextProvider } from "context/UserContext";
import { queryClient } from "lib/react-query";
import React from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "store/store";
import chakraTheme from "style/chakraTheme";
import GlobalDynamicStyles from "style/globalDynamicStyles";
import { initializeFirebase } from "utils/initializeFirebase";

initializeFirebase();

const AppProviders: React.FC = ({ children }) => {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <GlobalDynamicStyles />
        <ChakraProvider theme={chakraTheme}>
          <UserContextProvider>
            <QueryClientProvider client={queryClient}>
              {process.env.NODE_ENV !== "test" && <ReactQueryDevtools />}
              <ReduxProvider store={store}>{children}</ReduxProvider>
            </QueryClientProvider>
          </UserContextProvider>
        </ChakraProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
