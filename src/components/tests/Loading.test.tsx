import React from "react";

import Loading from "@/components/Loading/Loading";
import { render, screen } from "@/test/testUtils";

describe("The `Loading` component", () => {
  test("Renders the app logo", () => {
    render(<Loading />);

    expect(screen.getByRole("img", { name: /logo/i })).toBeInTheDocument();
  });

  test("Renders the spinner", () => {
    render(<Loading />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});
