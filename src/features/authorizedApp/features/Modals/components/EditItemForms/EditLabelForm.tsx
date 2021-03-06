import React from "react";

import { EditItemForm } from "./EditItemForm";

import { useEditLabel, useLabel } from "@/features/authorizedApp/api";
import { actions as modalsUiActions } from "@/features/authorizedApp/store/slices/modalsUi";

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

type EditLabelFormProps = { labelId: string };

export const EditLabelForm = ({ labelId }: EditLabelFormProps) => {
  const editLabelMutation = useEditLabel();
  const labelInfo = useLabel({ itemId: labelId });

  return (
    <EditItemForm
      itemId={labelId}
      formTitle="Edit label"
      closeModalAction={modalsUiActions.editLabelFormDismissed}
      editItemMutation={editLabelMutation}
      fieldsConfig={formFieldsConfig}
      itemInfo={labelInfo}
      data-testid="editLabelForm"
    />
  );
};
