import React from "react";

function isEditableElement(element: Element) {
  return element.tagName === "INPUT" || element.tagName === "TEXTAREA";
}

export function useKeyboardFocus(
  inputFieldRef: React.RefObject<HTMLInputElement>,
) {
  React.useEffect(() => {
    const { current: inputFieldElement } = inputFieldRef;
    if (!inputFieldElement) return;

    const handleKeyUp = (event: KeyboardEvent) => {
      if (document.activeElement && isEditableElement(document.activeElement)) {
        return;
      }
      if (event.code === "KeyF") inputFieldElement.focus();
    };

    document.addEventListener("keyup", handleKeyUp);

    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [inputFieldRef]);
}
