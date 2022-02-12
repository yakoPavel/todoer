import { Project } from "../../types";
import { generateGetItemQuery } from "../utils/getItems/generateGetItemsQuery";

export const { getItem: getProject, useItem: useProject } =
  generateGetItemQuery<Project>({
    dataLabel: ["projects"],
    endpoint: "/projects",
  });
