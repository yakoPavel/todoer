import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { QueryClientProvider } from "react-query";
import { Provider as ReduxProvider } from "react-redux";

import { ThemeContextProvider } from "@/context/ThemeContext";
import { UserContextProvider } from "@/context/UserContext";
import { store } from "@/features/authorizedApp/store/store";
import { queryClient } from "@/lib/react-query";
import { chakraTheme } from "@/style/chakraTheme";
import { initializeFirebase } from "@/utils/initializeFirebase";

initializeFirebase();

export const TestingProviders: React.FC = ({ children }) => {
  return (
    <ThemeContextProvider>
      <ChakraProvider theme={chakraTheme}>
        <UserContextProvider>
          <QueryClientProvider client={queryClient}>
            <ReduxProvider store={store}>{children}</ReduxProvider>
          </QueryClientProvider>
        </UserContextProvider>
      </ChakraProvider>
    </ThemeContextProvider>
  );
};
