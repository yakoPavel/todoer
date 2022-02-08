import Chance from "chance";
import { rest } from "msw";
import React from "react";

import { LabelsList } from "../LabelsList";

import { populateDb } from "@/test/dataGenerators";
import { db } from "@/test/server/db";
import { server } from "@/test/server/server";
import {
  render,
  screen,
  userEvent,
  waitForElementToBeRemoved,
  waitForApiCallsFinish,
} from "@/test/testUtils";

jest.mock("@/context/UserContext");

const SEED = 12345;
const chance = new Chance(SEED);

beforeEach(() => {
  populateDb({
    numberOfTasks: 1,
    numberOfLabels: 10,
    numberOfTasksWithLabels: 1,
  });
});

type RenderComponentOptions = {
  waitUntilIsLoaded?: boolean;
};

async function renderComponent({
  waitUntilIsLoaded = true,
}: RenderComponentOptions = {}) {
  const taskId = db.task.getAll()[0].id;

  render(<LabelsList taskId={taskId} />);

  const getSearchField = () =>
    screen.getByRole("textbox", { name: /type a label/i });
  const getListItems = () => screen.getAllByRole("option");
  const getSelectedOption = () =>
    screen.getByRole("option", { selected: true });
  const getNotSelectedOptions = () =>
    screen.getAllByRole("option", { selected: false });

  if (waitUntilIsLoaded) {
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  }

  return {
    getSearchField,
    getListItems,
    getSelectedOption,
    getNotSelectedOptions,
    labelsData: db.label.getAll(),
  };
}

describe("The `LabelsList` component", () => {
  describe("Rendering", () => {
    test("Renders the search field", async () => {
      const { getSearchField } = await renderComponent();

      expect(getSearchField()).toBeInTheDocument();
    });

    test("Renders list items", async () => {
      const { getListItems } = await renderComponent();

      expect(getListItems().length).toBeGreaterThan(0);
    });
  });

  describe("When the search field is not empty", () => {
    test("Shows only the labels whose name includes the search field value", async () => {
      const { getSearchField, getListItems, labelsData } =
        await renderComponent();

      const labelName = chance.pickone(labelsData).name;
      userEvent.type(getSearchField(), labelName);

      const listItems = getListItems();
      listItems.forEach((item) => {
        expect(item).toHaveTextContent(RegExp(labelName));
      });
    });

    test("When the user deletes characters, the items list updates accordingly", async () => {
      const { getSearchField, getListItems, labelsData } =
        await renderComponent();

      const labelName = chance.pickone(labelsData).name;
      const searchField = getSearchField() as HTMLInputElement;
      userEvent.type(searchField, labelName);

      for (let i = 0; i < labelName.length - 1; i++) {
        userEvent.type(searchField, "{backspace}");

        const listItems = getListItems();
        listItems.forEach((item) => {
          expect(item).toHaveTextContent(RegExp(searchField.value));
        });
      }
    });
  });

  describe("When the user clicks on an option that is not selected", () => {
    test("This item becomes selected", async () => {
      const { getSelectedOption, getNotSelectedOptions } =
        await renderComponent();

      const itemToSelect = chance.pickone(getNotSelectedOptions());
      userEvent.click(itemToSelect);

      await waitForApiCallsFinish();

      expect(getSelectedOption()).toHaveTextContent(
        itemToSelect.textContent as string,
      );
    });
  });

  describe("When the user clicks on an option that is selected", () => {
    test("This item becomes not selected", async () => {
      const { getSelectedOption, getNotSelectedOptions } =
        await renderComponent();

      const itemToUnselect = getSelectedOption();
      userEvent.click(itemToUnselect);

      await waitForApiCallsFinish();

      expect(getNotSelectedOptions()).toContain(itemToUnselect);
    });
  });

  describe("When a network error happens", () => {
    beforeEach(() => {
      server.use(
        rest.get("/tasks", (req, res, ctx) => {
          return res(ctx.status(404));
        }),
      );
    });

    test("Shows the error screen", async () => {
      await renderComponent();

      expect(screen.getByTestId("errorScreen")).toBeInTheDocument();
    });
  });
});
