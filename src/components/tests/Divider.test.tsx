import Chance from "chance";
import Divider from "components/Divider/Divider";
import React from "react";
import { render, screen } from "test/testUtils";

const SEED = 12345;
const chance = new Chance(SEED);

describe("The `Divider` component", () => {
  describe("When the `inBetween` prop is not specified", () => {
    test("Renders the component as a whole separator", () => {
      render(<Divider />);

      expect(screen.getByRole("separator")).toBeInTheDocument();
    });
  });

  describe("When the `inBetween` prop is specified", () => {
    test("Renders the component as two separators and a text", () => {
      const inBetweenText = chance.word();
      render(<Divider inBetweenText={inBetweenText} />);

      expect(screen.getAllByRole("separator")).toHaveLength(2);
      expect(screen.getByText(inBetweenText)).toBeInTheDocument();
    });
  });
});
