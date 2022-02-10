import { AxiosInstance } from "axios";
import { useQuery } from "react-query";

import { Task, Label, Project } from "@/features/authorizedApp/types";
import { useClient } from "@/hooks/useClient";
import { queryClient } from "@/lib/react-query";

type ItemData = Task | Label | Project;

type CreateQueryOptions = {
  /** A label for the data in react-query. */
  dataLabel: string | string[];
  /** An endpoint get data from. */
  endpoint: string;
};

export function generateGetItemsQuery<I extends ItemData = ItemData>({
  dataLabel,
  endpoint,
}: CreateQueryOptions) {
  async function getItems(
    instance: Promise<AxiosInstance>,
    params?: URLSearchParams,
  ): Promise<I[]> {
    const client = await instance;

    const finalEndpoint = params ? `${endpoint}/?${params}` : endpoint;

    return (await client.get(finalEndpoint)).data;
  }

  function useItems(params?: URLSearchParams) {
    const client = useClient();

    return useQuery({
      queryKey: dataLabel,
      queryFn: () => getItems(client, params),
      onSuccess: (data) => {
        data.forEach((item) => {
          queryClient.setQueryData([dataLabel, item.id], item);
        });
      },
    });
  }

  return {
    getItems,
    useItems,
  };
}

export function generateGetItemQuery<I extends ItemData = ItemData>({
  dataLabel,
  endpoint,
}: Omit<CreateQueryOptions, "params">) {
  async function getItem(
    instance: Promise<AxiosInstance>,
    itemId: string,
  ): Promise<I> {
    const client = await instance;

    return (await client.get(`/${endpoint}/${itemId}`)).data;
  }

  type UseItemParams = {
    itemId: string;
  };

  function useItem({ itemId }: UseItemParams) {
    const awaitedClient = useClient();

    return useQuery({
      queryKey: [dataLabel, itemId],
      queryFn: (() => getItem(awaitedClient, itemId)) as any,
    });
  }

  return {
    getItem,
    useItem,
  };
}
