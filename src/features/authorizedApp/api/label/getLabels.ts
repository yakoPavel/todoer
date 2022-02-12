import { Label } from "../../types";
import { generateGetItemsQuery } from "../utils/getItems/generateGetItemsQuery";

export const { getItems: getLabels, useItems: useLabels } =
  generateGetItemsQuery<Label>({
    dataLabel: ["labels"],
    endpoint: "/labels",
  });
