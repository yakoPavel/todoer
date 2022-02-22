import React from "react";

export function useKeyboardFocus(
  inputFieldRef: React.RefObject<HTMLInputElement>,
) {
  React.useEffect(() => {
    const { current: inputFieldElement } = inputFieldRef;
    if (!inputFieldElement) return;

    const handleKeyUp = (event: KeyboardEvent) => {
      if (document.activeElement === inputFieldElement) return;
      if (event.code === "KeyF") inputFieldElement.focus();
    };

    document.addEventListener("keyup", handleKeyUp);

    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [inputFieldRef]);
}
