import { Project } from "../../types";
import { generateDeleteMutation } from "../utils/deleteItem/generateDeleteMutation";

export const { deleteItem: deleteProject, useDelete: useDeleteProject } =
  generateDeleteMutation<Project>({
    dataLabel: "projects",
    endpoint: "/projects",
  });
