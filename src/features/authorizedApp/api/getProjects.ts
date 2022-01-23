import { AxiosInstance } from "axios";
import { useQuery } from "react-query";

import { Project } from "../types";

import { useClient } from "@/hooks/useClient";

async function getProjects(
  instance: Promise<AxiosInstance>,
): Promise<Project[]> {
  const client = await instance;

  return (await client.get("/projects")).data;
}

function useProjects() {
  const client = useClient();

  return useQuery("projects", () => getProjects(client));
}

export { getProjects, useProjects };
