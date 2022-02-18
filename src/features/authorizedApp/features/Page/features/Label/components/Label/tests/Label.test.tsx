import { drop } from "@mswjs/data";

import * as utils from "./utils";

import { populateDb } from "@/test/dataGenerators";
import { db } from "@/test/server/db";
import { screen, waitFor, waitForApiCallsFinish } from "@/test/testUtils";

jest.mock("@/context/UserContext");
jest.mock("@/features/authorizedApp/features/Page/hooks/useCorrectLocation");
jest.setTimeout(10_000);

const { renderComponent, componentGetters } = utils;

afterEach(async () => {
  await waitForApiCallsFinish();
});

beforeEach(() => {
  drop(db);
  populateDb({
    numberOfProjects: 1,
    numberOfLabels: 1,
    numberOfTasks: 10,
  });
});

describe("The `Label` component", () => {
  describe("Rendering", () => {
    test("Renders the project heading", async () => {
      const { labelData } = await renderComponent();
      const { getTitleElement } = componentGetters;

      expect(getTitleElement(labelData.name)).toBeInTheDocument();
    });

    test("Renders the 'Edit label' button", async () => {
      await renderComponent();
      const { getEditLabelButton } = componentGetters;

      expect(getEditLabelButton()).toBeInTheDocument();
    });

    test("Renders the 'Delete label' button", async () => {
      await renderComponent();
      const { getDeleteLabelButton } = componentGetters;

      expect(getDeleteLabelButton()).toBeInTheDocument();
    });

    test("Renders all the tasks", async () => {
      const { tasksWithTheLabelData } = await renderComponent();

      tasksWithTheLabelData.forEach(({ name }) => {
        expect(screen.getByText(name)).toBeInTheDocument();
      });
    });
  });

  describe("When the label name gets changed through the editable title", () => {
    test("Shows the new title", async () => {
      const { labelData } = await renderComponent();

      const newName = await utils.changeLabelNameThroughEditableTitle(
        labelData.name,
      );

      await waitFor(() =>
        expect(
          screen.getByRole("heading", { name: newName }),
        ).toBeInTheDocument(),
      );
    });
  });

  describe("When the label name gets changed through the 'Edit label' dialog", () => {
    test("Shows the new title", async () => {
      await renderComponent();

      const newName = await utils.changeLabelNameThroughEditDialog();

      await waitFor(() =>
        expect(
          screen.getByRole("heading", { name: newName }),
        ).toBeInTheDocument(),
      );
    });
  });

  describe("When an ongoing task gets marked as completed", () => {
    test("Doesn't show this task in the list with ongoing tasks", async () => {
      await renderComponent();
      const { ongoingTasksBefore, taskTitle } = utils.markTaskAsCompleted(0);
      const { getOngoingTasks, queryOngoingTaskTitle } = componentGetters;

      await waitFor(() => {
        const ongoingTasksAfter = getOngoingTasks();
        expect(ongoingTasksAfter).toHaveLength(ongoingTasksBefore.length - 1);
      });

      expect(queryOngoingTaskTitle(taskTitle)).not.toBeInTheDocument();
    });

    test("Shows this task in the list with completed tasks", async () => {
      await renderComponent();
      const { taskTitle } = utils.markTaskAsCompleted(0);
      const { getCompletedTaskTitle } = componentGetters;

      await waitFor(async () =>
        expect(getCompletedTaskTitle(taskTitle)).toBeInTheDocument(),
      );
    });
  });

  describe("When a completed task gets marked as ongoing", () => {
    const populateDbWithCompletedTask = () => {
      drop(db);
      populateDb({
        numberOfCompletedTasks: 2,
        numberOfLabels: 1,
        numberOfProjects: 1,
        numberOfTasks: 10,
      });
    };

    test("Doesn't show this task in the list with completed tasks", async () => {
      populateDbWithCompletedTask();
      await renderComponent();

      const { taskTitle } = utils.markTaskAsOngoing(0);
      const { queryCompletedTaskTitle } = componentGetters;

      await waitFor(async () =>
        expect(queryCompletedTaskTitle(taskTitle)).not.toBeInTheDocument(),
      );
    });

    test("Shows this task in the list with ongoing tasks", async () => {
      populateDbWithCompletedTask();
      await renderComponent();

      const { taskTitle } = utils.markTaskAsOngoing(0);
      const { getOngoingTaskTitle } = componentGetters;

      await waitFor(() =>
        expect(getOngoingTaskTitle(taskTitle)).toBeInTheDocument(),
      );
    });
  });

  describe("When the task gets deleted through the 'Delete task' option", () => {
    test("Doesn't render it", async () => {
      await renderComponent();

      const taskTitle = utils.deleteTask(0);

      const { queryOngoingTaskTitle } = componentGetters;
      await waitFor(() =>
        expect(queryOngoingTaskTitle(taskTitle)).not.toBeInTheDocument(),
      );
    });
  });
});
