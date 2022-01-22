import { Text } from "@chakra-ui/react";
import React from "react";

import Dialog from "../Dialog/Dialog";

import { useAppDispatch } from "@/hooks/storeHooks";
import { actions as uiActions } from "@/store/slices/ui";

type RemoveItemDialogProps = {
  /** A type of the item that needs to be removed. */
  itemType: "project" | "label";
  /** An id of the item that needs to be removed. */
  itemId: string;
};

const DeleteItemDialog: React.FC<RemoveItemDialogProps> = ({
  itemType,
  itemId,
}) => {
  const dispatch = useAppDispatch();
  const dummyItemToDelete = { name: "Do my homework" };

  const onCancel = () => {
    dispatch(uiActions.deleteItemDialogDismissed());
  };

  const onConfirm = () => {
    // TODO: remove item here

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

export default DeleteItemDialog;
