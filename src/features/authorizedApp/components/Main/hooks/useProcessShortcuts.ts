import React from "react";

import { useEventHandlers } from "./useEventHandlers";

import * as shortcuts from "@/config/keyboardShortcuts";

type ShortcutNames = keyof typeof shortcuts;

function getMatchingShortcutName(pressedKeys: Set<string>) {
  for (const [shortcutName, shortcutValue] of Object.entries(shortcuts)) {
    if (shortcutValue.every((value) => pressedKeys.has(value.toLowerCase()))) {
      return shortcutName as ShortcutNames;
    }
  }
}

function stripKeyName(keyName: string) {
  return keyName.replace(/key|left|right/i, "").toLowerCase();
}

export function useProcessShortcuts() {
  const { onGoHome, onLogout, onThemeChange, onToggleSideMenu } =
    useEventHandlers();
  const currentlyPressedKeysRef = React.useRef<Set<string>>(new Set());

  React.useEffect(() => {
    const invokeAction = (shortcutName: ShortcutNames) => {
      if (shortcutName === "GO_HOME") return onGoHome();
      if (shortcutName === "LOGOUT") return onLogout();
      if (shortcutName === "THEME") return onThemeChange();
      if (shortcutName === "TOGGLE_MENU") return onToggleSideMenu();
    };

    const listenToKeyDown = (event: KeyboardEvent) => {
      const pressedKey = stripKeyName(event.code);
      currentlyPressedKeysRef.current.add(pressedKey);

      const matchingShortcutName = getMatchingShortcutName(
        currentlyPressedKeysRef.current,
      );

      if (matchingShortcutName) invokeAction(matchingShortcutName);
    };

    const listenToKeyUp = (event: KeyboardEvent) => {
      const pressedKey = stripKeyName(event.code);
      currentlyPressedKeysRef.current.delete(pressedKey);
    };

    document.addEventListener("keydown", listenToKeyDown);
    document.addEventListener("keyup", listenToKeyUp);

    return () => {
      document.removeEventListener("keydown", listenToKeyDown);
      document.removeEventListener("keyup", listenToKeyUp);
    };
  }, [onGoHome, onLogout, onThemeChange, onToggleSideMenu]);
}
