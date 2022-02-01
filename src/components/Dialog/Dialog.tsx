import { Heading } from "@chakra-ui/react";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

import * as Styled from "./styles";

import { Overlay } from "@/components/Overlay/Overlay";
import { Tooltip } from "@/components/Tooltip/Tooltip";

type ControlsProps = {
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonTitle?: string;
  cancelButtonTitle?: string;
};
const Controls = ({
  onConfirm,
  onCancel,
  confirmButtonTitle = "Ok",
  cancelButtonTitle = "Cancel",
}: ControlsProps) => {
  return (
    <Styled.ControlsWrapper>
      <Styled.ControlButton
        variant="secondary"
        type="button"
        onClick={onCancel}
      >
        {cancelButtonTitle}
      </Styled.ControlButton>
      <Styled.ControlButtonWithLeftMargin type="button" onClick={onConfirm}>
        {confirmButtonTitle}
      </Styled.ControlButtonWithLeftMargin>
    </Styled.ControlsWrapper>
  );
};

type CloseModalButtonProps = {
  onClick: () => void;
};
const CloseModalButton = ({ onClick }: CloseModalButtonProps) => {
  return (
    <Tooltip tooltipText="Close modal">
      <Styled.CloseButton type="button" aria-label="Close" onClick={onClick}>
        <AiOutlineClose size="1.8rem" aria-hidden />
      </Styled.CloseButton>
    </Tooltip>
  );
};

type BaseProps = {
  /** Content of the dialog. */
  dialogContent: React.ReactNode;
  /** A title of the dialog. */
  dialogTitle?: string;
  /** A callback that will be called when the dialog is cancelled. */
  onCancel: () => void;
};

type WithButtons = {
  /** Whether to show control buttons or not. */
  withButtons: true;
  /** A callback that will be called when the confirm button is clicked. */
  onConfirm: () => void;
  /** A title of the confirm button. */
  confirmButtonTitle?: string;
  /** A title of the cancel button. */
  cancelButtonTitle?: string;
};

type WithoutButtons = {
  /** Whether to show control buttons or not. */
  withButtons?: false;
};

export type DialogProps =
  | (BaseProps & WithButtons)
  | (BaseProps & WithoutButtons);

export const Dialog: React.FC<DialogProps> = (props) => {
  const { dialogContent, dialogTitle, onCancel } = props;

  return (
    <Overlay>
      <Styled.Container role="dialog">
        <Styled.DialogHeader>
          {dialogTitle && (
            <Heading as="h3" size="md">
              {dialogTitle}
            </Heading>
          )}
          <CloseModalButton onClick={onCancel} />
        </Styled.DialogHeader>
        <Styled.ContentWrapper>{dialogContent}</Styled.ContentWrapper>
        {props.withButtons && (
          <Controls
            onCancel={props.onCancel}
            onConfirm={props.onConfirm}
            cancelButtonTitle={props.cancelButtonTitle}
            confirmButtonTitle={props.confirmButtonTitle}
          />
        )}
      </Styled.Container>
    </Overlay>
  );
};
