import styled from "@emotion/styled/macro";
import React from "react";

import { actions as sideMenuUiActions } from "@/features/authorizedApp/store/slices/sideMenuUi";
import { useAppDispatch } from "@/hooks/storeHooks";

const RESIZE_HANDLE_WIDTH = "0.5rem";

const ResizeHandle = styled.div<{ resizing: boolean }>`
  width: ${RESIZE_HANDLE_WIDTH};
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

type ElementOrNull = HTMLElement | null;

type UseResizeOptions = {
  /** A minimal width of the element in pixels. */
  minWidth: number;
  /** A maximum width of the element in pixels. */
  maxWidth: number;
};

type UseResizeReturn = {
  /** A ref setter for the outer resizable element. */
  outerResizableElemRef: React.Dispatch<React.SetStateAction<ElementOrNull>>;
  /** A ref setter for the inner resizable element. */
  innerResizableElemRef: React.Dispatch<React.SetStateAction<ElementOrNull>>;
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
 * A hook that manages resizing.
 */
function useResize({ minWidth, maxWidth }: UseResizeOptions): UseResizeReturn {
  const dispatch = useAppDispatch();

  const [outerResizableElem, setOuterResizableElem] =
    React.useState<ElementOrNull>(null);
  const [innerResizableElem, setInnerResizableElem] =
    React.useState<ElementOrNull>(null);
  const [resizeHandle, setResizeHandle] = React.useState<ElementOrNull>(null);
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
    if (resizeHandle === null) return;
    if (outerResizableElem === null) return;
    if (innerResizableElem === null) return;

    const startResizing = () => {
      setResizing(true);

      let newWidth: number;

      const updateWidth = (moveEvent: MouseEvent) => {
        if (moveEvent.clientX > maxWidth || moveEvent.clientX < minWidth) {
          return;
        }
        newWidth = moveEvent.clientX;
        outerResizableElem.style.width = `${newWidth}px`;
        innerResizableElem.style.width = `calc(${newWidth}px - ${RESIZE_HANDLE_WIDTH})`;
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

        dispatch(sideMenuUiActions.widthChanged(newWidth));
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
  }, [
    resizeHandle,
    outerResizableElem,
    maxWidth,
    minWidth,
    dispatch,
    innerResizableElem,
  ]);

  return {
    outerResizableElemRef: setOuterResizableElem,
    innerResizableElemRef: setInnerResizableElem,
    ResizeHandle,
    resizeHandleProps: {
      ref: setResizeHandle,
      resizing,
    },
  };
}

export { useResize };
