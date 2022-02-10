import React from "react";

import { Task, TaskProps } from "../Task";

import { populateDb } from "@/test/dataGenerators";
// eslint-disable-next-line import/order
import { db } from "@/test/server/db";

jest.mock("@/context/UserContext");

import {
  render,
  screen,
  userEvent,
  waitForApiCallsFinish,
  act,
  fireEvent,
  within,
} from "@/test/testUtils";
import { UniqueChance } from "@/test/UniqueChance";

const SEED = 12345;
const chance = new UniqueChance(SEED);

beforeEach(() => {
  populateDb({
    numberOfProjects: 1,
    numberOfTasks: 1,
    numberOfLabels: 3,
  });
});

async function renderComponent(override?: Partial<TaskProps>) {
  const taskId = db.task.getAll()[0].id;

  const props: TaskProps = {
    title: chance.sentence(),
    description: chance.sentence(),
    id: taskId,
    isDone: false,
    onDoneStatusChange: jest.fn(),
    popupClickHandler: jest.fn(),
    ...override,
  };

  render(
    <>
      <div id="root" />
      <Task {...props} />
    </>,
  );

  const getTaskContainer = () => screen.getByTestId("task");
  const getCompletionCheckbox = () => screen.getByRole("checkbox");
  const getTitle = () => screen.getByText(props.title);
  const getDescription = () => screen.getByText(props.description as string);
  const getPopupTriggerButton = () =>
    screen.getByRole("button", {
      name: /open the menu/i,
    });
  const getLabelSelectionButton = () =>
    screen.getByRole("button", { name: /change or set label/i });
  const queryLabelSelectionButton = () =>
    screen.queryByRole("button", { name: /change or set label/i });
  const findLabelsList = () => screen.findByTestId("labelsList");
  const getPopupMenu = () => screen.getByRole("menu");

  await waitForApiCallsFinish();

  return {
    props,
    getTaskContainer,
    getCompletionCheckbox,
    getTitle,
    getDescription,
    getPopupTriggerButton,
    getLabelSelectionButton,
    queryLabelSelectionButton,
    findLabelsList,
    getPopupMenu,
  };
}

describe("The `Task` component", () => {
  describe("Rendering", () => {
    test("Renders a task title", async () => {
      const { getTitle } = await renderComponent();

      expect(getTitle()).toBeInTheDocument();
    });

    test("Renders a task description", async () => {
      const { getDescription } = await renderComponent();

      expect(getDescription()).toBeInTheDocument();
    });

    test("Renders the 'Popup trigger' button", async () => {
      const { getPopupTriggerButton } = await renderComponent();

      expect(getPopupTriggerButton()).toBeInTheDocument();
    });

    test("Renders the completion checkbox", async () => {
      const { getCompletionCheckbox } = await renderComponent();

      expect(getCompletionCheckbox()).toBeInTheDocument();
    });

    test("Renders the label selection button", async () => {
      const { getLabelSelectionButton } = await renderComponent();

      expect(getLabelSelectionButton()).toBeInTheDocument();
    });
  });

  describe("When the completion checkmark is checked", () => {
    test("Invokes the `onDoneStatusChange` prop", async () => {
      const {
        getCompletionCheckbox,
        props: { onDoneStatusChange },
      } = await renderComponent();

      userEvent.click(getCompletionCheckbox());

      expect(onDoneStatusChange).toHaveBeenCalledTimes(1);
      expect(onDoneStatusChange).toHaveBeenCalledWith(expect.any(Boolean));
    });
  });

  describe("When the label selection button is clicked", () => {
    test("Shows the label selection list", async () => {
      const { getLabelSelectionButton, findLabelsList } =
        await renderComponent();

      userEvent.click(getLabelSelectionButton());

      expect(await findLabelsList()).toBeInTheDocument();
    });
  });

  describe("When the popup menu trigger button is clicked", () => {
    test("Shows the popup menu", async () => {
      const { getPopupMenu, getPopupTriggerButton } = await renderComponent();

      act(() => userEvent.click(getPopupTriggerButton()));

      expect(getPopupMenu()).toBeInTheDocument();
    });
  });

  describe("When the user right-clicks/long-presses on the component", () => {
    test("Shows the popup menu", async () => {
      const { getPopupMenu, getTaskContainer } = await renderComponent();

      act(() => {
        fireEvent.contextMenu(getTaskContainer());
      });

      expect(getPopupMenu()).toBeInTheDocument();
    });
  });

  describe("When the 'isDone' prop is `true`", () => {
    test("Doesn't show the label selection button", async () => {
      const { queryLabelSelectionButton } = await renderComponent({
        isDone: true,
      });

      expect(queryLabelSelectionButton()).not.toBeInTheDocument();
    });

    test("The popup menu contains only the 'Delete' option", async () => {
      const { getPopupTriggerButton, getPopupMenu } = await renderComponent({
        isDone: true,
      });

      act(() => userEvent.click(getPopupTriggerButton()));

      const popupMenu = getPopupMenu();
      const menuItem = within(popupMenu).getByRole("menuitem");

      expect(menuItem).toHaveTextContent(/delete/i);
    });
  });
});
