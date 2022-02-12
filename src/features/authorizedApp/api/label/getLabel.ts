import { Label } from "../../types";
import { generateGetItemQuery } from "../utils/getItems/generateGetItemsQuery";

export const { getItem: getLabel, useItem: useLabel } =
  generateGetItemQuery<Label>({
    dataLabel: ["labels"],
    endpoint: "/labels",
  });
