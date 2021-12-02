import React from "react";
import { render, screen, userEvent } from "test/testUtils";

import { Default as PasswordInput } from "../PasswordInput/PasswordInput.stories";

test("hides and shows the password when the 'password visibility button' is clicked", () => {
  render(<PasswordInput />);
  const inputField = screen.getByLabelText(/^password$/i);
  const changeVisibilityButton = screen.getByRole("button", {
    name: /(show|hide) password/i,
  });

  expect(inputField).toHaveAttribute("type", "password");

  userEvent.click(changeVisibilityButton);
  expect(inputField).toHaveAttribute("type", "text");

  userEvent.click(changeVisibilityButton);
  expect(inputField).toHaveAttribute("type", "password");
});
