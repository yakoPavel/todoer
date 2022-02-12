import { omit } from "lodash";

import { Project } from "../../types";
import { generateCreateMutation } from "../utils/createItem/generateCreateMutation";

import { CreateProjectBody } from "@/types";

export const { createItem: createProject, useCreateItem: useCreateProject } =
  generateCreateMutation({
    dataLabel: ["projects"],
    endpoint: "/projects",
    getNewItemForOptimisticUpdate: (data: CreateProjectBody): Project => {
      return {
        id: data.tempId,
        createdAt: Date.now(),
        isFavorite: data.isFavorite ?? false,
        taskIds: [],
        ...omit(data, ["direction", "triggerId", "tempId", "isFavorite"]),
      };
    },
  });
