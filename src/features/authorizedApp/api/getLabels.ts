import { AxiosInstance } from "axios";
import { useQuery } from "react-query";

import { Label } from "../types";

import { useClient } from "@/hooks/useClient";

async function getLabels(instance: Promise<AxiosInstance>): Promise<Label[]> {
  const client = await instance;

  return (await client.get("/labels")).data;
}

function useLabels() {
  const client = useClient();

  return useQuery("labels", () => getLabels(client));
}

export { getLabels, useLabels };
