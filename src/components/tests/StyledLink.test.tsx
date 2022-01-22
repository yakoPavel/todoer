import Chance from "chance";
import React from "react";

import { StyledLink } from "@/components/StyledLink/StyledLink";
import { render, screen } from "@/test/testUtils";

const SEED = 12345;
const chance = new Chance(SEED);

describe("The `StyledLink` component", () => {
  const href = chance.url();
  const to = `/${chance.word()}`;
  const linkText = chance.word();

  test("Can render a link when the `href` prop is passed", () => {
    render(<StyledLink href={href}>{linkText}</StyledLink>);

    expect(screen.getByRole("link", { name: linkText })).toBeInTheDocument();
  });

  test("Can render a link when the `to` prop is passed", () => {
    render(<StyledLink to={to}>{linkText}</StyledLink>);

    expect(screen.getByRole("link", { name: linkText })).toBeInTheDocument();
  });
});
