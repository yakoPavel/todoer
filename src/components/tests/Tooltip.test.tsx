import Chance from "chance";
import React from "react";
import { render, screen } from "test/testUtils";

import Tooltip from "../Tooltip/Tooltip";

const chance = new Chance();

function renderTooltip(shortcut?: string[]) {
  const tooltipText = chance.word();
  const triggerText = chance.sentence();

  const renderResult = render(
    <Tooltip tooltipText={tooltipText} shortcut={shortcut} isOpen>
      <div>{triggerText}</div>
    </Tooltip>,
  );

  return { tooltipText, triggerText, ...renderResult };
}

describe("The `Tooltip` component", () => {
  describe("Rendering", () => {
    test("Renders a tooltip trigger component", () => {
      const { triggerText } = renderTooltip();
      expect(screen.getByText(triggerText)).toBeInTheDocument();
    });

    test("Can render a tooltip with a plain text as a label", () => {
      const { tooltipText } = renderTooltip();

      expect(
        screen.getByRole("tooltip", { name: tooltipText }),
      ).toBeInTheDocument();
    });

    test("Can render a tooltip with a keyboard shortcut", () => {
      const sampleShortcut = ["shift", "M"];
      const { tooltipText } = renderTooltip(["shift", "M"]);

      const tooltip = screen.getByRole("tooltip", {
        name: RegExp(tooltipText),
      });

      sampleShortcut.forEach((key) =>
        expect(tooltip.textContent).toMatch(RegExp(key)),
      );
    });
  });
});
