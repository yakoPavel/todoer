import styled from "@emotion/styled/macro";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

import { Button } from "@/components/Button/Button";
import { Overlay } from "@/components/Overlay/Overlay";
import { Tooltip } from "@/components/Tooltip/Tooltip";

const Container = styled.div`
  position: relative;
  background: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  color: ${({ theme }) => theme.text};
  padding: 1rem;
  max-width: 98%;
  min-width: min(98%, 25rem);
`;

const ContentWrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: 3rem;
`;

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ControlButton = styled(Button)`
  padding: 0.5rem 1.5rem;
`;

const ControlButtonWithLeftMargin = styled(ControlButton)`
  margin-left: 1.5rem;
`;

const CloseButton = styled.button`
  padding: 0.5rem;
  border-radius: 5px;
  margin-left: auto;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundTertiary};
  }
`;

export type DialogProps = {
  /** Content of the dialog. */
  dialogContent: React.ReactNode;
  /** A callback that will be called when the confirm button is clicked. */
  onConfirm: () => void;
  /** A callback that will be called when the cancel button is clicked. */
  onCancel: () => void;
  /** A title of the confirm button. */
  confirmButtonTitle?: string;
  /** A title of the cancel button. */
  cancelButtonTitle?: string;
};

export const Dialog: React.FC<DialogProps> = ({
  dialogContent,
  onCancel,
  onConfirm,
  confirmButtonTitle = "Ok",
  cancelButtonTitle = "Cancel",
}) => {
  return (
    <Overlay>
      <Container role="dialog">
        <Tooltip tooltipText="Close modal">
          <CloseButton type="button" aria-label="Close" onClick={onCancel}>
            <AiOutlineClose size="1.8rem" aria-hidden />
          </CloseButton>
        </Tooltip>
        <ContentWrapper>{dialogContent}</ContentWrapper>
        <ControlsWrapper>
          <ControlButton variant="secondary" type="button" onClick={onCancel}>
            {cancelButtonTitle}
          </ControlButton>
          <ControlButtonWithLeftMargin type="button" onClick={onConfirm}>
            {confirmButtonTitle}
          </ControlButtonWithLeftMargin>
        </ControlsWrapper>
      </Container>
    </Overlay>
  );
};
