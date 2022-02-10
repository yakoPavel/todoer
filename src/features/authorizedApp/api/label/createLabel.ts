import { omit } from "lodash";

import { Label } from "../../types";
import { generateCreateMutation } from "../utils/createItem/generateCreateMutation";

import { CreateLabelBody } from "@/types";

export const { createItem: createLabel, useCreateItem: useCreateLabel } =
  generateCreateMutation({
    dataLabel: "labels",
    endpoint: "/labels",
    getNewItemForOptimisticUpdate: (data: CreateLabelBody): Label => {
      const { tempId, isFavorite } = data;

      return {
        id: tempId,
        createdAt: Date.now(),
        isFavorite: isFavorite ?? false,
        ...(omit(data, ["position", "tempId", "isFavorite"]) as Omit<
          typeof data,
          "position" | "tempId" | "isFavorite"
        >),
      };
    },
  });
