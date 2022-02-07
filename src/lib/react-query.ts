/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import {
  DefaultOptions,
  QueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from "react-query";

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    cacheTime: Infinity,
    staleTime: 5000,
    useErrorBoundary: true,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export type QueryConfig<FetcherFnType extends (...args: any[]) => any> =
  UseQueryOptions<Awaited<ReturnType<FetcherFnType>>>;

export type MutationConfig<FetcherFnType extends (...args: any[]) => any> =
  UseMutationOptions<
    Awaited<ReturnType<FetcherFnType>>,
    AxiosError,
    Parameters<FetcherFnType>[0]
  >;
