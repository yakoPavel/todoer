import styled from "@emotion/styled/macro";

import { Button } from "@/components/Button/Button";
import * as mediaQueries from "@/style/mediaQueries";

export const Container = styled.div`
  position: relative;
  background: ${({ theme }) => theme.modalFormBackground};
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  color: ${({ theme }) => theme.text};
  max-width: 98%;
  min-width: min(98%, 25rem);
  max-height: 90vh;
`;

export const ContentWrapper = styled.div`
  padding: 0 1rem 1rem 1rem;
  margin-top: 2rem;
  margin-bottom: 3rem;
  overflow-y: auto;

  ${mediaQueries.sm} {
    padding: 0 2rem 1rem 2rem;
  }
`;

export const ControlsWrapper = styled.div`
  padding: 0 1rem 1rem 1rem;
  display: flex;
  justify-content: flex-end;

  ${mediaQueries.sm} {
    padding: 0 2rem 1rem 2rem;
  }
`;

export const ControlButton = styled(Button)`
  padding: 0.5rem 1.5rem;
`;

export const ControlButtonWithLeftMargin = styled(ControlButton)`
  margin-left: 1.5rem;
`;

export const DialogHeader = styled.div`
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.separators};
  background: ${({ theme }) => theme.modalFormTitleBackground};
`;

export const CloseButton = styled.button`
  padding: 0.5rem;
  border-radius: 5px;
  margin-left: auto;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundTertiary};
  }
`;
