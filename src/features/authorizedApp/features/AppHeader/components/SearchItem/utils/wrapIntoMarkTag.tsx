import React from "react";

import { MarkedText } from "../styles";

/**
 * Wraps the parts of the string that match the `searchQuery` into a `<mark>`
 * tag.
 *
 * @param text - A text that should be processed.
 * @param searchQuery - A search query the parts of the `text` should
 *  be matched against.
 */
export function wrapIntoMarkTag(text: string, searchQuery: string) {
  if (!searchQuery) return text;

  const regexp = RegExp(searchQuery, "ig");
  let currentStart = 0;
  const result = [];

  for (let i = 0; ; i += 1) {
    const execResult = regexp.exec(text);
    if (execResult === null) {
      result.push(
        <React.Fragment key={i}>{text.slice(currentStart)}</React.Fragment>,
      );
      break;
    }

    result.push(
      <React.Fragment key={i}>
        {text.slice(currentStart, execResult.index)}
        <MarkedText>
          {text.slice(execResult.index, regexp.lastIndex)}
        </MarkedText>
      </React.Fragment>,
    );

    currentStart = regexp.lastIndex;
  }

  return result;
}
