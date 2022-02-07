import { AxiosInstance } from "axios";
import { useQuery } from "react-query";

import { Task } from "../types";

import { useClient } from "@/hooks/useClient";

const DATA_LABEL = "tasks";

async function getTasks(instance: Promise<AxiosInstance>): Promise<Task[]> {
  const client = await instance;

  return (await client.get("/tasks")).data;
}

function useTasks() {
  const client = useClient();

  return useQuery(DATA_LABEL, () => getTasks(client));
}

export { getTasks, useTasks as useProjects };
