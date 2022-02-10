import { Project } from "../../types";
import { generateGetItemsQuery } from "../utils/getItems/generateGetItemsQuery";

export const { getItems: getProjects, useItems: useProjects } =
  generateGetItemsQuery<Project>({
    dataLabel: "projects",
    endpoint: "/projects",
  });
