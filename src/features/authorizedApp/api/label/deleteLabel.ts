import { Label } from "../../types";
import { generateDeleteMutation } from "../utils/deleteItem/generateDeleteMutation";

export const { deleteItem: deleteLabel, useDelete: useDeleteLabel } =
  generateDeleteMutation<Label>({
    dataLabel: ["labels"],
    endpoint: "/labels",
  });
