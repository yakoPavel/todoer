import { drop } from "@mswjs/data";

import * as utils from "./utils";

import { populateDb } from "@/test/dataGenerators";
import { db } from "@/test/server/db";
import { waitForApiCallsFinish } from "@/test/testUtils";

const { renderComponent, componentGetters } = utils;

jest.mock("@/context/UserContext");

beforeEach(() => {
  drop(db);

  populateDb({
    numberOfTasks: 10,
    numberOfLabels: 10,
    numberOfProjects: 10,
  });
});

afterEach(async () => {
  await waitForApiCallsFinish();
});

describe("The `Search` component", () => {
  describe("Rendering", () => {
    test("Renders the search input", async () => {
      await renderComponent();
      const { getSearchInput } = componentGetters;

      expect(getSearchInput()).toBeInTheDocument();
    });

    test("Renders the container with results", async () => {
      await renderComponent();
      const { getSearchResultContainer } = componentGetters;

      expect(getSearchResultContainer()).toBeInTheDocument();
    });
  });

  describe("When the 'Clear input' button is clicked", () => {
    test("Clears the input field", async () => {
      await renderComponent();

      const searchQuery = utils.chance.word();
      const inputField = utils.typeInSearchQuery(searchQuery);

      expect(inputField).toHaveValue(searchQuery);

      await utils.clickClearInputButton();

      expect(inputField).toHaveValue("");
    });
  });

  describe("When the search field is not empty", () => {
    test("Renders only options which contain the search field value in their name", async () => {
      await renderComponent();

      const nameOfSomeTask = db.task.getAll()[0].name;
      const searchQuery = nameOfSomeTask.slice(0, nameOfSomeTask.length / 2);

      utils.typeInSearchQuery(searchQuery);

      const { getAllSearchResults } = utils.componentGetters;

      getAllSearchResults().forEach((element) => {
        expect(element?.textContent).toMatch(RegExp(searchQuery, "i"));
      });
    });
  });
});
