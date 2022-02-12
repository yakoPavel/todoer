import React from "react";

import { DescriptionElement } from "../TaskForm";

export function useCorrectDescriptionHeight(
  maxHeight: number,
  descriptionElement: DescriptionElement,
) {
  React.useEffect(() => {
    if (descriptionElement === null) return;

    const correctHeight = () => {
      const { lineHeight } = window.getComputedStyle(descriptionElement);
      const numberOfLines = descriptionElement.value.split("\n").length;
      const heightToAccommodateContent =
        numberOfLines * Number.parseInt(lineHeight);

      if (heightToAccommodateContent <= maxHeight) {
        descriptionElement.style.height = `${heightToAccommodateContent}px`;
      }
    };

    descriptionElement.addEventListener("input", correctHeight);

    return () => descriptionElement.removeEventListener("input", correctHeight);
  }, [descriptionElement, maxHeight]);
}
