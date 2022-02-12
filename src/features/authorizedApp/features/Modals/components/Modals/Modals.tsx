import React from "react";

import { AddLabelForm } from "../AddItemForms/AddLabelForm";
import { AddProjectForm } from "../AddItemForms/AddProjectForm";
import { DeleteItemDialog } from "../DeleteItemDialog/DeleteItemDialog";
import { EditLabelForm } from "../EditItemForms/EditLabelForm";
import { EditProjectForm } from "../EditItemForms/EditProjectForm";

import {
  useLabel,
  useProject,
  useTask,
  useDeleteLabel,
  useDeleteProject,
  useDeleteTask,
  UseDeleteMutation,
  UseItemQuery,
} from "@/features/authorizedApp/api";
import { ThemeSwitcher } from "@/features/authorizedApp/features/ThemeSwitcher";
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
  const themeSwitcherDialog = useAppSelector(
    selectors.selectThemeSwitcherDialogState,
  );

  if (addProjectForm.visible) {
    return (
      <AddProjectForm
        direction={addProjectForm.additionDirection}
        triggerId={addProjectForm.triggerId}
      />
    );
  }
  if (editProjectForm.visible) {
    return <EditProjectForm projectId={editProjectForm.triggerId} />;
  }
  if (addLabelForm.visible) {
    return (
      <AddLabelForm
        direction={addLabelForm.additionDirection}
        triggerId={addLabelForm.triggerId}
      />
    );
  }
  if (editLabelForm.visible) {
    return <EditLabelForm labelId={editLabelForm.triggerId} />;
  }
  if (deleteItemDialog.visible) {
    const { itemType, itemId } = deleteItemDialog;

    const deleteMutations = {
      label: useDeleteLabel,
      project: useDeleteProject,
      task: useDeleteTask,
    };

    const itemQueries = {
      label: useLabel,
      project: useProject,
      task: useTask,
    };

    return (
      <DeleteItemDialog
        itemId={itemId}
        useDeleteMutation={deleteMutations[itemType] as UseDeleteMutation}
        useItemQuery={itemQueries[itemType] as UseItemQuery}
      />
    );
  }
  if (themeSwitcherDialog.visible) {
    return <ThemeSwitcher />;
  }

  return null;
};
