import React from "react";

import AppHeader from "../components/AppHeader/AppHeader";

import { render, screen } from "@/test/testUtils";

test("renders all the header content", () => {
  render(<AppHeader menuState="closed" />);

  expect(
    screen.getByRole("button", { name: /open the menu/i }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /go to home/i }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /quick add/i }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /change the theme/i }),
  ).toBeInTheDocument();

  expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();

  expect(screen.getByRole("search")).toBeInTheDocument();
});
