import Chance from "chance";
import React from "react";
import { render, screen } from "test/testUtils";

import Tooltip from "../Tooltip/Tooltip";

const chance = new Chance();

function renderTooltip(shortcut?: string[]) {
  const tooltipText = chance.word();

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
