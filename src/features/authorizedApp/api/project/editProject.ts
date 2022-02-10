import { omit } from "lodash";

import { Project } from "../../types";
import { generateEditMutation } from "../utils/editItem/generateEditMutation";

import { PatchProjectBody } from "@/types";

export const { editItem: editProject, useEdit: useEditProject } =
  generateEditMutation({
    dataLabel: "projects",
    endpoint: "/projects",
    getOptimisticUpdate: (data: PatchProjectBody): Partial<Project> => {
      return omit(data, "position") as Partial<Project>;
    },
  });
