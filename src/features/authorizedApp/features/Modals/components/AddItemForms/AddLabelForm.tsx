import React from "react";

import { AddItemForm } from "./AddItemForm";

import { useCreateLabel } from "@/features/authorizedApp/api/createLabel";
import { actions as modalsUiActions } from "@/features/authorizedApp/store/slices/modalsUi";
import { actions as sideMenuUiActions } from "@/features/authorizedApp/store/slices/sideMenuUi";

const formFieldsConfig = [
  {
    label: "Label name" as const,
    name: "name" as const,
    type: "text" as const,
    required: true,
  },
  {
    label: "Label color" as const,
    name: "color" as const,
    type: "color" as const,
    required: true,
  },
  {
    label: "Add to favorites" as const,
    name: "isFavorite" as const,
    type: "switch" as const,
  },
];

export const AddLabelForm = () => {
  const createLabelMutation = useCreateLabel();

  return (
    <AddItemForm
      closeModalAction={modalsUiActions.addLabelFormDismissed}
      openSectionAction={sideMenuUiActions.labelsSectionOpened}
      fieldsConfig={formFieldsConfig}
      createItemMutation={createLabelMutation}
    />
  );
};
