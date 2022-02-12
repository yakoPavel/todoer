import React from "react";

import { TitleElement, DescriptionElement } from "../TaskForm";

function getClosestToClickField(
  clickY: number,
  titleField: HTMLInputElement,
  descriptionField: HTMLTextAreaElement,
) {
  const { y: descriptionY } = descriptionField.getBoundingClientRect();

  if (clickY < descriptionY) return titleField;
  return descriptionField;
}

/**
 * This hook is responsible for focusing the correct field (the input field
 * with a title or the text area with a description) when the user clicks at the
 * editing area padding around these fields.
 */
export function useFocusAfterPaddingClick(
  titleElement: TitleElement,
  descriptionElement: DescriptionElement,
) {
  const onEditingAreaClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.dataset.editingArea) return;
    if (!titleElement || !descriptionElement) return;

    const closestToClick = getClosestToClickField(
      event.clientY,
      titleElement,
      descriptionElement,
    );
    closestToClick.focus();
  };

  return {
    onEditingAreaClick,
  };
}
