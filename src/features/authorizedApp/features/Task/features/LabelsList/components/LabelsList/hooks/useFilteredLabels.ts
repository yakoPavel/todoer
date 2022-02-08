import React from "react";

import { Label } from "@/features/authorizedApp/types";

export function useFilteredLabels(labels: Label[]) {
  const [filterValue, setFilterValue] = React.useState("");

  const onFilterValueChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFilterValue(event.target.value);

  const filteredLabels = labels.filter((label) =>
    label.name.includes(filterValue),
  );

  return {
    onFilterValueChange,
    filteredLabels,
  };
}
