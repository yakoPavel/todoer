/* eslint-disable jest/no-standalone-expect */
import Chance from "chance";
import cases from "jest-in-case";
import React from "react";

import Button from "@/components/Button/Button";
import { render, screen } from "@/test/testUtils";

const SEED = 12345;
const chance = new Chance(SEED);

describe("The `Button` component", () => {
  cases(
    "Rendering",
    (opts) => {
      const buttonText = chance.word();
      render(<Button variant={opts.variant}>{buttonText}</Button>);

      expect(
        screen.getByRole("button", { name: buttonText }),
      ).toBeInTheDocument();
    },
    [
      {
        name: "Can render the button with a 'primary' variant",
        variant: "primary" as const,
      },
      {
        name: "Can render the button with a 'secondary' variant",
        variant: "secondary" as const,
      },
    ],
  );
});
