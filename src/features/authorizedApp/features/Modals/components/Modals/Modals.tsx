import React from "react";

import { AddLabelForm } from "../AddItemForms/AddLabelForm";
import { AddProjectForm } from "../AddItemForms/AddProjectForm";
import { DeleteItemDialog } from "../DeleteItemDialog/DeleteItemDialog";
import { EditLabelForm } from "../EditItemForms/EditLabelForm";
import { EditProjectForm } from "../EditItemForms/EditProjectForm";
// import { EditLabelForm } from "../EditLabelForm/EditLabelForm";
// import { EditProjectForm } from "../EditProjectForm/EditProjectForm";

import { selectors } from "@/features/authorizedApp/store/slices/modalsUi";
import { useAppSelector } from "@/hooks/storeHooks";

export const Modals = () => {
  const addProjectForm = useAppSelector(selectors.selectAddProjectFormState);
  const addLabelForm = useAppSelector(selectors.selectAddLabelFormState);
  const editProjectForm = useAppSelector(selectors.selectEditProjectFormState);
  const editLabelForm = useAppSelector(selectors.selectEditLabelFormState);
  const deleteItemDialog = useAppSelector(
    selectors.selectDeleteItemDialogState,
  );

  if (addProjectForm.visible) {
    return <AddProjectForm />;
  }
  if (editProjectForm.visible) {
    return <EditProjectForm projectId={editProjectForm.triggerId} />;
  }
  if (addLabelForm.visible) {
    return <AddLabelForm />;
  }
  if (editLabelForm.visible) {
    return <EditLabelForm labelId={editLabelForm.triggerId} />;
  }
  if (deleteItemDialog.visible) {
    return (
      <DeleteItemDialog
        itemId={deleteItemDialog.itemId}
        itemType={deleteItemDialog.itemType}
      />
    );
  }

  return null;
};
