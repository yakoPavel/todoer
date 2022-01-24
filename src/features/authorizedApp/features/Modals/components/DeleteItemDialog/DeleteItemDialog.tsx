import { Text } from "@chakra-ui/react";
import React from "react";

import { Dialog } from "../Dialog/Dialog";

import { useDeleteLabel } from "@/features/authorizedApp/api/deleteLabel";
import { useDeleteProject } from "@/features/authorizedApp/api/deleteProject";
import { useAppDispatch } from "@/hooks/storeHooks";
import { actions as uiActions } from "@/store/slices/ui";

type RemoveItemDialogProps = {
  /** A type of the item that needs to be removed. */
  itemType: "project" | "label";
  /** An id of the item that needs to be removed. */
  itemId: string;
};

export const DeleteItemDialog: React.FC<RemoveItemDialogProps> = ({
  itemType,
  itemId,
}) => {
  const dispatch = useAppDispatch();
  const deleteProjectMutation = useDeleteProject();
  const deleteLabelMutation = useDeleteLabel();
  const dummyItemToDelete = { name: "Do my homework" };

  const onCancel = () => {
    dispatch(uiActions.deleteItemDialogDismissed());
  };

  const onConfirm = () => {
    if (itemType === "project") {
      deleteProjectMutation.mutate(itemId);
    } else {
      deleteLabelMutation.mutate(itemId);
    }

    dispatch(uiActions.deleteItemDialogDismissed());
  };

  const dialogContent = (
    <Text>
      Are you sure you want to delete <b>{dummyItemToDelete.name}</b>?
    </Text>
  );
  return (
    <Dialog
      dialogContent={dialogContent}
      onCancel={onCancel}
      onConfirm={onConfirm}
      confirmButtonTitle="Delete"
      cancelButtonTitle="Cancel"
    />
  );
};
