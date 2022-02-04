/**
 * @file Heavy integration tests here. May take a time to run them all.
 */

import { capitalize } from "lodash";
import React from "react";

import { SideMenu } from "../SideMenu";

import { Modals } from "@/features/authorizedApp/features/Modals";
import { populateDb, PopulateDbOptions } from "@/test/dataGenerators";
import {
  render,
  screen,
  waitFor,
  within,
  userEvent,
  fireEvent,
  act,
} from "@/test/testUtils";

jest.mock("@/context/UserContext");

type PrepareTestDataOptions = Partial<PopulateDbOptions> & {
  waitForDataLoading?: boolean;
};

async function prepareTestData({
  numberOfLabels = 3,
  numberOfProjects = 3,
  numberOfFavoriteLabels,
  numberOfFavoriteProjects,
  waitForDataLoading = true,
}: PrepareTestDataOptions = {}) {
  const { labels, projects, user } = populateDb({
    numberOfLabels,
    numberOfProjects,
    numberOfFavoriteLabels,
    numberOfFavoriteProjects,
  });

  render(
    <>
      {/* The popup menu renders here */}
      <div id="root" />
      {/* We need this component, because modals render outside the SideMenu component */}
      <Modals />
      <SideMenu isOpen={true} />
    </>,
  );

  if (waitForDataLoading) {
    await waitFor(() =>
      expect(screen.getByTestId("sideMenuContent")).toBeInTheDocument(),
    );
  }

  return {
    labels,
    projects,
    user,
  };
}

function getProjectsCommon() {
  const getSectionContent = () => screen.getByLabelText(/projects/i);
  const getToggleSectionButton = () =>
    screen.getByRole("button", { name: /projects/i });
  const getAddNewButton = () =>
    screen.getByRole("button", { name: /add new project/i });

  const openSection = async () => {
    const toggleProjectsButton = getToggleSectionButton();
    userEvent.click(toggleProjectsButton);

    await waitFor(() => expect(getSectionContent()).toBeVisible());
  };

  return {
    getSectionContent,
    openSection,
    getAddNewButton,
  };
}

function getLabelsCommon() {
  const getSectionContent = () => screen.getByLabelText(/labels/i);
  const getToggleSectionButton = () =>
    screen.getByRole("button", { name: /labels/i });
  const getAddNewButton = () =>
    screen.getByRole("button", { name: /add new label/i });

  const openSection = async () => {
    const toggleProjectsButton = getToggleSectionButton();
    userEvent.click(toggleProjectsButton);

    await waitFor(() => expect(getSectionContent()).toBeVisible());
  };

  return {
    getSectionContent,
    openSection,
    getAddNewButton,
  };
}

function getFavoritesCommon() {
  const getSectionContent = () => screen.getByLabelText(/favorites/i);
  const getToggleSectionButton = () =>
    screen.getByRole("button", { name: /favorites/i });

  const openSection = async () => {
    const toggleFavoritesButton = getToggleSectionButton();
    userEvent.click(toggleFavoritesButton);

    await waitFor(() => expect(getSectionContent()).toBeVisible());
  };

  return {
    getSectionContent,
    openSection,
  };
}

function fillAndSubmitForm(projectName: string, isFavorite = false) {
  const projectNameInput = screen.getByRole("textbox", { name: /name/i });
  userEvent.type(projectNameInput, projectName);

  const submitButton = screen.getByRole("button", { name: /submit/i });
  userEvent.click(submitButton);

  if (isFavorite) {
    const addToFavoritesCheckbox = screen.getByRole("checkbox", {
      name: /add to favorites/i,
    });
    userEvent.click(addToFavoritesCheckbox);
  }
}

describe("SideMenu", () => {
  beforeAll(() => {
    jest.spyOn(console, "error");
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  describe("Rendering", () => {
    test("Renders all the section titles", async () => {
      await prepareTestData();

      expect(screen.getByText("Favorites")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Labels")).toBeInTheDocument();
    });

    test("Renders a button for a new project addition.", async () => {
      await prepareTestData();
      const projectsCommon = getProjectsCommon();

      expect(projectsCommon.getAddNewButton()).toBeInTheDocument();
    });

    test("Renders a button for a new label addition.", async () => {
      await prepareTestData();

      expect(
        screen.getByRole("button", { name: /add new label/i }),
      ).toBeInTheDocument();
    });
  });

  describe.each([
    [
      "Labels",
      "labels",
      "label",
      getLabelsCommon(),
      getFavoritesCommon(),
    ] as const,
    [
      "Projects",
      "projects",
      "project",
      getProjectsCommon(),
      getFavoritesCommon(),
    ] as const,
  ])(
    "%s",
    (
      sectionTitle,
      sectionName,
      sectionItemName,
      sectionCommon,
      favoritesSectionCommon,
    ) => {
      test(`When ${sectionName} data is loaded, renders a list with these ${sectionName}`, async () => {
        const data = await prepareTestData();

        await sectionCommon.openSection();

        const sectionContentWrapper = within(sectionCommon.getSectionContent());
        for (const item of data[sectionName]) {
          expect(
            sectionContentWrapper.getByRole("link", {
              name: item.name,
            }),
          ).toBeInTheDocument();
        }
      });

      test(`When the 'Add new ${sectionItemName}' button is pressed, shows the new ${sectionItemName} addition form`, async () => {
        await prepareTestData();

        const addNewButton = sectionCommon.getAddNewButton();
        userEvent.click(addNewButton);

        expect(
          screen.getByTestId(`add${capitalize(sectionItemName)}Form`),
        ).toBeInTheDocument();
      });

      test(`When a new ${sectionItemName} is added through the 'Add new ${sectionItemName}' button, shows a link to it at the end of the list`, async () => {
        const data = await prepareTestData();

        await sectionCommon.openSection();

        const addNewButton = sectionCommon.getAddNewButton();
        userEvent.click(addNewButton);

        const newItemName = "SOME NAME";
        fillAndSubmitForm(newItemName);

        const sectionContent = within(sectionCommon.getSectionContent());
        let linksInTheSection: HTMLElement[] = [];
        await waitFor(() => {
          linksInTheSection = sectionContent.getAllByRole("link");
          return expect(linksInTheSection).toHaveLength(
            data[sectionName].length + 1,
          );
        });

        expect(
          linksInTheSection[linksInTheSection.length - 1],
        ).toHaveTextContent(newItemName);
      });

      test(`When a new ${sectionItemName} is added through the 'Add ${sectionItemName} above' menu option, shows a link to this ${sectionItemName} above the one triggered the menu`, async () => {
        await prepareTestData();

        await sectionCommon.openSection();

        const sectionContent = within(sectionCommon.getSectionContent());
        const firstItemLink = sectionContent.getAllByRole("link")[0];
        fireEvent.contextMenu(firstItemLink);

        act(() =>
          userEvent.click(
            screen.getByRole("menuitem", {
              name: new RegExp(`add ${sectionItemName} above`, "i"),
            }),
          ),
        );

        const newItemName = "SOME NAME";
        fillAndSubmitForm(newItemName);

        await waitFor(() =>
          expect(sectionContent.getAllByRole("link")[0]).toHaveTextContent(
            newItemName,
          ),
        );
      });

      test(`When a new ${sectionItemName} is added through the 'Add ${sectionItemName} below' menu option, shows a link to this ${sectionItemName} below the one triggered the menu`, async () => {
        await prepareTestData();

        await sectionCommon.openSection();

        const sectionContent = within(sectionCommon.getSectionContent());
        const firstItemLink = sectionContent.getAllByRole("link")[0];
        fireEvent.contextMenu(firstItemLink);

        act(() =>
          userEvent.click(
            screen.getByRole("menuitem", {
              name: new RegExp(`add ${sectionItemName} below`, "i"),
            }),
          ),
        );

        const newItemName = "SOME NAME";
        fillAndSubmitForm(newItemName);

        await waitFor(() =>
          expect(sectionContent.getAllByRole("link")[1]).toHaveTextContent(
            newItemName,
          ),
        );
      });

      test(`When a ${sectionItemName} is edited, shows the edited version in the list of links`, async () => {
        await prepareTestData();

        await sectionCommon.openSection();

        const sectionContent = within(sectionCommon.getSectionContent());
        const firstItemLink = sectionContent.getAllByRole("link")[0];
        fireEvent.contextMenu(firstItemLink);

        act(() =>
          userEvent.click(
            screen.getByRole("menuitem", {
              name: new RegExp(`edit ${sectionItemName}`, "i"),
            }),
          ),
        );

        const newItemName = "SOME NAME";
        fillAndSubmitForm(newItemName);

        await waitFor(() =>
          expect(sectionContent.getAllByRole("link")[0]).toHaveTextContent(
            newItemName,
          ),
        );
      });

      test(`When a ${sectionItemName} is deleted, doesn't show it in the list of links`, async () => {
        const data = await prepareTestData();

        await sectionCommon.openSection();

        const sectionContent = within(sectionCommon.getSectionContent());
        const firstItemLink = sectionContent.getAllByRole("link")[0];
        fireEvent.contextMenu(firstItemLink);

        act(() =>
          userEvent.click(
            screen.getByRole("menuitem", {
              name: new RegExp(`delete ${sectionItemName}`, "i"),
            }),
          ),
        );

        const deleteButton = screen.getByRole("button", { name: /delete/i });
        userEvent.click(deleteButton);

        await waitFor(() =>
          expect(sectionContent.getAllByRole("link")).toHaveLength(
            data[sectionName].length - 1,
          ),
        );
        expect(
          sectionContent.queryByRole("link", {
            name: data[sectionName][0].name,
          }),
        ).not.toBeInTheDocument();
      });

      describe("Favorites", () => {
        const getFavoriteItem = <T extends { isFavorite: boolean }[]>(
          data: T,
        ) => {
          return data.find(({ isFavorite }) => isFavorite) as T[number];
        };

        test(`When a ${sectionItemName} is not in the favorites, shows the 'Add to favorites' option in the popup menu`, async () => {
          await prepareTestData({ [`numberOfFavorite${sectionTitle}`]: 0 });

          await sectionCommon.openSection();

          const sectionContent = within(sectionCommon.getSectionContent());
          const firstItemLink = sectionContent.getAllByRole("link")[0];
          fireEvent.contextMenu(firstItemLink);

          expect(
            screen.getByRole("menuitem", { name: /add to favorites/i }),
          ).toBeInTheDocument();
        });

        test(`When a ${sectionItemName} is in the favorites, shows the 'Remove from favorites' option in the popup menu`, async () => {
          const data = await prepareTestData({
            [`numberOfFavorite${sectionTitle}`]: 1,
          });

          await sectionCommon.openSection();

          const sectionContent = within(sectionCommon.getSectionContent());
          const favoriteItemName = getFavoriteItem(data[sectionName]).name;
          const favoriteItem = sectionContent.getByRole("link", {
            name: favoriteItemName,
          });
          fireEvent.contextMenu(favoriteItem);

          expect(
            screen.getByRole("menuitem", { name: /remove from favorites/i }),
          ).toBeInTheDocument();
        });

        test(`When a ${sectionItemName} is added to the favorites, shows it in the list of favorites`, async () => {
          const data = await prepareTestData({
            [`numberOfFavorite${sectionTitle}`]: 0,
          });

          await sectionCommon.openSection();

          const sectionContent = within(sectionCommon.getSectionContent());
          const firstItemLink = sectionContent.getAllByRole("link")[0];
          fireEvent.contextMenu(firstItemLink);

          act(() =>
            userEvent.click(
              screen.getByRole("menuitem", { name: /add to favorites/i }),
            ),
          );

          await favoritesSectionCommon.openSection();

          const favoritesContent = within(
            favoritesSectionCommon.getSectionContent(),
          );

          expect(
            favoritesContent.getByRole("link", {
              name: data[sectionName][0].name,
            }),
          ).toBeInTheDocument();
        });

        test(`When a ${sectionItemName} is removed from the favorites, doesn't show it in the list of favorites`, async () => {
          const data = await prepareTestData({
            [`numberOfFavorite${sectionTitle}`]: 1,
          });

          await sectionCommon.openSection();

          const sectionContent = within(sectionCommon.getSectionContent());
          const favoriteItemName = getFavoriteItem(data[sectionName]).name;
          const favoriteItem = sectionContent.getByRole("link", {
            name: favoriteItemName,
          });
          fireEvent.contextMenu(favoriteItem);

          act(() =>
            userEvent.click(
              screen.getByRole("menuitem", { name: /remove from favorites/i }),
            ),
          );

          await favoritesSectionCommon.openSection();

          const favoritesContent = within(
            favoritesSectionCommon.getSectionContent(),
          );

          expect(
            favoritesContent.queryByRole("link", { name: favoriteItemName }),
          ).not.toBeInTheDocument();
        });
      });
    },
  );
});
