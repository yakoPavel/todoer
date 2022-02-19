import { debounce } from "lodash";
import React from "react";

/**
 * This hook sets the input field max-width initially and whenever the
 * window width changes.
 */
export function useCorrectInputMaxWidth(
  inputFieldRef: React.RefObject<HTMLInputElement>,
) {
  React.useLayoutEffect(() => {
    if (!inputFieldRef.current) return;

    const { current: inputField } = inputFieldRef;

    const setInputFieldMaxWidth = debounce(() => {
      const { x: inputXCoord } = inputField.getBoundingClientRect();
      const windowWidth = document.documentElement.clientWidth;

      const MIN_PADDING_FROM_THE_BORDER = 16;

      const maxWidth = windowWidth - inputXCoord - MIN_PADDING_FROM_THE_BORDER;
      inputField.style.maxWidth = `${maxWidth}px`;
    }, 300);

    setInputFieldMaxWidth();
    window.addEventListener("resize", setInputFieldMaxWidth);

    return () => window.removeEventListener("resize", setInputFieldMaxWidth);
  }, [inputFieldRef]);
}
