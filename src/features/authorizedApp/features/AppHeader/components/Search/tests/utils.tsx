import { Chance } from "chance";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import { Search } from "../Search";

import {
  render,
  screen,
  within,
  waitForApiCallsFinish,
  userEvent,
} from "@/test/testUtils";

const SEED = 12345;
export const chance = new Chance(SEED);

export const componentGetters = {
  getSearchInput() {
    return screen.getByRole("search");
  },
  getClearButton() {
    return screen.findByText(/clear input/i);
  },
  findClearInputButton() {
    return screen.findByText(/clear input/i);
  },
  getSearchResultContainer() {
    return screen.getByRole("listbox");
  },
  getAllSearchResults() {
    const { getSearchResultContainer } = componentGetters;

    return within(getSearchResultContainer()).getAllByRole("link");
  },
};

export async function renderComponent() {
  render(
    <MemoryRouter>
      <Search />
    </MemoryRouter>,
  );

  await waitForApiCallsFinish();
}

/**
 * Clicks the 'Clear input' button
 */
export async function clickClearInputButton() {
  const { findClearInputButton } = componentGetters;

  userEvent.click(await findClearInputButton());
}

/**
 * Types in the specified query into the search field.
 *
 * @return The input field element.
 */
export function typeInSearchQuery(searchQuery: string) {
  const { getSearchInput } = componentGetters;

  const inputField = getSearchInput();

  userEvent.click(inputField);
  userEvent.type(inputField, searchQuery);

  return inputField;
}
