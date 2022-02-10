import { omit } from "lodash";

import { Label } from "../../types";
import { generateEditMutation } from "../utils/editItem/generateEditMutation";

import { PatchLabelBody } from "@/types";

export const { editItem: editLabel, useEdit: useEditLabel } =
  generateEditMutation({
    dataLabel: "labels",
    endpoint: "/labels",
    getOptimisticUpdate: (data: PatchLabelBody): Partial<Label> => {
      return omit(data, "position");
    },
  });
