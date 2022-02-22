import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import React from "react";

import { Dialog } from "@/components/Dialog/Dialog";
import { actions as modalsActions } from "@/features/authorizedApp/store/slices/modalsUi";
import { useAppDispatch } from "@/hooks/storeHooks";
import { signOut } from "@/utils/authentication";

const Message = styled(Text)`
  font-size: 1.5rem;
`;

export const LogoutDialog = () => {
  const dispatch = useAppDispatch();

  const dismissTheModal = () => {
    dispatch(modalsActions.logoutDialogDismissed());
  };

  const onLogoutConfirm = () => {
    signOut();
    dispatch(modalsActions.logoutDialogDismissed());
  };

  return (
    <Dialog
      dialogContent={<Message>Do you really want to log out?</Message>}
      withButtons
      onCancel={dismissTheModal}
      onConfirm={onLogoutConfirm}
      dialogTitle="Log out"
    />
  );
};
