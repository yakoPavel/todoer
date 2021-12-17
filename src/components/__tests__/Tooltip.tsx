import faker from "faker";
import React from "react";
import { render, screen } from "test/testUtils";

import Tooltip from "../Tooltip/Tooltip";

function renderTooltip(shortcut?: string[]) {
  const tooltipText = faker.lorem.words();

  const renderResult = render(
    <Tooltip tooltipText={tooltipText} shortcut={shortcut} isOpen>
      <div>Trigger</div>
    </Tooltip>,
  );

  return { tooltipText, ...renderResult };
}

test("renders a tooltip with a plain text", () => {
  const { tooltipText } = renderTooltip();

  expect(
    screen.getByRole("tooltip", { name: tooltipText }),
  ).toBeInTheDocument();
});

test("renders a tooltip with a keyboard shortcut", () => {
  const sampleShortcut = ["shift", "M"];
  const { tooltipText } = renderTooltip(["shift", "M"]);

  const tooltip = screen.getByRole("tooltip", {
    name: RegExp(tooltipText),
  });

  sampleShortcut.forEach((key) =>
    expect(tooltip.textContent?.includes(key)).toBe(true),
  );
});
