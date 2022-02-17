import { drop } from "@mswjs/data";

import * as utils from "./utils";

import { populateDb } from "@/test/dataGenerators";
import { db } from "@/test/server/db";
import {
  screen,
  waitFor,
  within,
  waitForApiCallsFinish,
} from "@/test/testUtils";

jest.mock("@/context/UserContext");
jest.mock("@/features/authorizedApp/features/Page/hooks/useCorrectLocation");
jest.setTimeout(10_000);

const { renderComponent, componentGetters } = utils;

afterEach(async () => {
  await waitForApiCallsFinish();
});

beforeEach(() => {
  populateDb({
    numberOfProjects: 1,
    numberOfLabels: 10,
    numberOfTasks: 10,
  });
});

describe("The `Project` component", () => {
  describe("Rendering", () => {
    test("Renders the project header", async () => {
      const { projectData } = await renderComponent();
      const { getTitleElement } = componentGetters;

      expect(getTitleElement(projectData.name)).toBeInTheDocument();
    });

    test("Renders the 'Edit the project' button", async () => {
      await renderComponent();
      const { getEditProjectButton } = componentGetters;

      expect(getEditProjectButton()).toBeInTheDocument();
    });

    test("Renders the 'Delete the project' button", async () => {
      await renderComponent();
      const { getDeleteProjectButton } = componentGetters;

      expect(getDeleteProjectButton()).toBeInTheDocument();
    });

    test("Renders all the tasks", async () => {
      const { tasksInTheProjectData } = await renderComponent();

      tasksInTheProjectData.forEach(({ name }) => {
        expect(screen.getByText(name)).toBeInTheDocument();
      });
    });

    test("Renders the 'Add task' button", async () => {
      await renderComponent();
      const { getAddTaskButton } = componentGetters;

      expect(getAddTaskButton()).toBeInTheDocument();
    });
  });

  describe("When the project name gets changed through the editable title", () => {
    test("Shows the new title", async () => {
      const { projectData } = await renderComponent();

      const newName = await utils.changeProjectNameThroughEditableTitle(
        projectData.name,
      );

      await waitFor(() =>
        expect(
          screen.getByRole("heading", { name: newName }),
        ).toBeInTheDocument(),
      );
    });
  });

  describe("When the project name gets changed through the 'Edit project' dialog", () => {
    test("Shows the new title", async () => {
      await renderComponent();

      const newName = await utils.changeProjectNameThroughEditDialog();

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
      const { findCompletedTaskTitle } = componentGetters;

      await waitFor(async () =>
        expect(await findCompletedTaskTitle(taskTitle)).toBeInTheDocument(),
      );
    });
  });

  describe("When a completed task gets marked as ongoing", () => {
    const populateDbWithCompletedTask = () => {
      drop(db);
      populateDb({
        numberOfCompletedTasks: 2,
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

  describe("When the user clicks the 'Add task above' option in a task's menu", () => {
    test("Renders the form above the task", async () => {
      await renderComponent();

      utils.clickOptionInTaskPopupMenu({
        optionName: /add task above/i,
        taskIndex: 0,
        taskList: "ongoing",
      });
      const { getFormsAndTasksInTheOngoingList } = componentGetters;

      const formAndTasks = getFormsAndTasksInTheOngoingList();

      // The task above which we are adding the new one is the first was the
      // list, so the form now should be the first.
      expect(formAndTasks[0]).toHaveAttribute("data-testid", "addTaskForm");
    });
  });

  describe("When the user adds the task through the 'Add task above' option in a task's menu", () => {
    test("Renders the new task above the task initiated the process", async () => {
      await renderComponent();

      utils.clickOptionInTaskPopupMenu({
        optionName: /add task above/i,
        taskIndex: 0,
        taskList: "ongoing",
      });
      const { getAddTaskForm, getOngoingTasks } = componentGetters;

      const form = getAddTaskForm();
      const newTaskName = utils.fillInAndSubmitTaskForm(form);

      await waitFor(() => {
        const ongoingTasks = getOngoingTasks();
        const titleOfTheFirstTask = utils.getTaskTitleText(ongoingTasks[0]);

        expect(titleOfTheFirstTask).toBe(newTaskName);
      });
    });
  });

  describe("When the user clicks the 'Add task below' option in a task's menu", () => {
    test("Renders the form below the task", async () => {
      await renderComponent();

      utils.clickOptionInTaskPopupMenu({
        optionName: /add task below/i,
        taskIndex: 0,
        taskList: "ongoing",
      });
      const { getFormsAndTasksInTheOngoingList } = componentGetters;

      const formAndTasks = getFormsAndTasksInTheOngoingList();

      // The task above which we are adding the new one is the first was the
      // list, so the form now should be the second.
      expect(formAndTasks[1]).toHaveAttribute("data-testid", "addTaskForm");
    });
  });

  describe("When the user adds the task through the 'Add task below' option in a task's menu", () => {
    test("Renders the new task below the task initiated the process", async () => {
      await renderComponent();

      utils.clickOptionInTaskPopupMenu({
        optionName: /add task below/i,
        taskIndex: 0,
        taskList: "ongoing",
      });
      const { getAddTaskForm, getOngoingTasks } = componentGetters;

      const form = getAddTaskForm();
      const newTaskName = utils.fillInAndSubmitTaskForm(form);

      await waitFor(() => {
        const ongoingTasks = getOngoingTasks();
        const titleOfTheSecondTask = utils.getTaskTitleText(ongoingTasks[1]);

        expect(titleOfTheSecondTask).toBe(newTaskName);
      });
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

  describe("When the task gets edited through the 'Edit task' option", () => {
    test("Renders the edited version of the task", async () => {
      await renderComponent();

      const taskTitle = utils.clickOptionInTaskPopupMenu({
        optionName: /edit task/i,
        taskIndex: 0,
        taskList: "ongoing",
      });

      const form = componentGetters.getEditTaskForm();
      const taskTitleAfter = utils.fillInAndSubmitTaskForm(form);

      const { getOngoingTaskTitle, queryOngoingTaskTitle } = componentGetters;
      await waitFor(() => {
        expect(queryOngoingTaskTitle(taskTitle)).not.toBeInTheDocument();
        expect(getOngoingTaskTitle(taskTitleAfter)).toBeInTheDocument();
      });
    });
  });

  describe("When the new task is added through the 'Add task' button", () => {
    test("Renders the new task at the end of the list with ongoing tasks", async () => {
      await renderComponent();

      const taskTitle = utils.addTaskThroughAddTaskButton();

      const { getOngoingTasks } = componentGetters;
      await waitFor(() => {
        const ongoingTasks = getOngoingTasks();

        const lastOngoingTaskTitle = within(
          ongoingTasks[ongoingTasks.length - 1],
        ).getByRole("heading");

        expect(lastOngoingTaskTitle).toHaveTextContent(taskTitle);
      });
    });
  });
});
