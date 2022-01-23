import { DefaultOptions, QueryClient } from "react-query";

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    cacheTime: Infinity,
    staleTime: 5000,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
