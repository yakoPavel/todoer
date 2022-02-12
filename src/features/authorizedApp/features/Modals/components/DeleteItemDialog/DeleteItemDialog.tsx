import { Spinner, Text } from "@chakra-ui/react";
import React from "react";

import { Dialog } from "@/components/Dialog/Dialog";
import { UseDeleteMutation, UseItemQuery } from "@/features/authorizedApp/api";
import { ErrorScreen } from "@/features/authorizedApp/components/ErrorScreen/ErrorScreen";
import { actions as modalsUiActions } from "@/features/authorizedApp/store/slices/modalsUi";
import { useAppDispatch } from "@/hooks/storeHooks";

type RemoveItemDialogProps = {
  /**
   * A react query hook that brings information about the item that needs to
   * be deleted.
   */
  useItemQuery: UseItemQuery;
  /**
   * A react query mutation that the component should use to delete the item.
   */
  useDeleteMutation: UseDeleteMutation;
  /** An id of the item that needs to be removed. */
  itemId: string;
};

export const DeleteItemDialog: React.FC<RemoveItemDialogProps> = ({
  useItemQuery,
  useDeleteMutation,
  itemId,
}) => {
  const dispatch = useAppDispatch();
  const itemInfoQuery = useItemQuery({ itemId });
  const deleteItemMutation = useDeleteMutation();

  if (itemInfoQuery.isError) {
    return <ErrorScreen />;
  }

  if (!itemInfoQuery.data) {
    return <Spinner size="xl" />;
  }

  const onCancel = () => {
    dispatch(modalsUiActions.deleteItemDialogDismissed());
  };

  const onConfirm = () => {
    deleteItemMutation.mutate(itemId);

    dispatch(modalsUiActions.deleteItemDialogDismissed());
  };

  const dialogContent = (
    <Text>
      Are you sure you want to delete <b>{itemInfoQuery.data.name}</b>?
    </Text>
  );
  return (
    <Dialog
      dialogContent={dialogContent}
      onCancel={onCancel}
      onConfirm={onConfirm}
      confirmButtonTitle="Delete"
      cancelButtonTitle="Cancel"
      withButtons
    />
  );
};
