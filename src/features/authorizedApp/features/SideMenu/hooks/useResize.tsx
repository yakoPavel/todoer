import styled from "@emotion/styled/macro";
import React from "react";

import { SIDE_MENU } from "@/config/localStorage";
import * as localStorage from "@/utils/localStorage";

const ResizeHandle = styled.div<{ resizing: boolean }>`
  width: 0.5rem;
  height: 100%;
  cursor: ${({ resizing }) => (resizing ? "unset" : "col-resize")};
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${({ resizing, theme }) =>
    resizing ? theme.backgroundTertiary : "transparent"};

  &:hover {
    background-color: ${({ theme }) => theme.backgroundTertiary};
  }
`;

type UseResizeOptions = {
  /** A minimal width of the element in pixels. */
  minWidth: number;
  /** A maximum width of the element in pixels. */
  maxWidth: number;
};

type UseResizeReturn = {
  /** A ref for the element that should be resizable. */
  resizableElementRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  /** A resizing handle element. */
  ResizeHandle: typeof ResizeHandle;

  resizeHandleProps: {
    /**
     * A ref for the resizing handle element. Must be passed to the `ResizeHandle`.
     */
    ref: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    /** Whether or not the element in the 'resizing' state. */
    resizing: boolean;
  };
};

/**
 * A hook that manages resizing of the specified element.
 */
function useResize({ minWidth, maxWidth }: UseResizeOptions): UseResizeReturn {
  const [resizableElement, setResizableElement] =
    React.useState<HTMLElement | null>(null);
  const [resizeHandle, setResizeHandle] = React.useState<HTMLElement | null>(
    null,
  );
  const [resizing, setResizing] = React.useState(false);

  React.useLayoutEffect(() => {
    if (resizing) {
      document.documentElement.style.cursor = "ew-resize";
    }

    return () => {
      document.documentElement.style.cursor = "unset";
    };
  }, [resizing]);

  React.useLayoutEffect(() => {
    if (resizeHandle === null || resizableElement === null) return;

    const startResizing = () => {
      setResizing(true);

      let newWidth: number;

      const updateWidth = (moveEvent: MouseEvent) => {
        if (moveEvent.clientX > maxWidth || moveEvent.clientX < minWidth) {
          return;
        }
        newWidth = moveEvent.clientX;
        resizableElement.style.width = `${newWidth}px`;
      };

      const preventDragging = (event: DragEvent) => event.preventDefault();
      const preventSelecting = (event: Event) => event.preventDefault();

      const finishResize = () => {
        document.documentElement.removeEventListener("mousemove", updateWidth);
        document.documentElement.removeEventListener("mouseup", finishResize);
        document.documentElement.removeEventListener(
          "dragstart",
          preventDragging,
        );
        document.documentElement.removeEventListener(
          "selectstart",
          preventSelecting,
        );
        setResizing(false);

        localStorage.saveToLocalStorage(SIDE_MENU.WIDTH, newWidth);
      };

      document.documentElement.addEventListener("mousemove", updateWidth);
      document.documentElement.addEventListener("mouseup", finishResize);
      document.documentElement.addEventListener("dragstart", preventDragging);
      document.documentElement.addEventListener(
        "selectstart",
        preventSelecting,
      );
    };

    resizeHandle.addEventListener("mousedown", startResizing);

    return () => resizeHandle.removeEventListener("mousedown", startResizing);
  }, [resizeHandle, resizableElement, maxWidth, minWidth]);

  return {
    resizableElementRef: setResizableElement,
    ResizeHandle,
    resizeHandleProps: {
      ref: setResizeHandle,
      resizing,
    },
  };
}

export { useResize };
