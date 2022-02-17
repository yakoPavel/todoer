import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { Project } from "../Project";

import { Modals } from "@/features/authorizedApp/features/Modals";
import { db } from "@/test/server/db";
import {
  screen,
  userEvent,
  within,
  render,
  waitForElementToBeRemoved,
  waitForApiCallsFinish,
  act,
} from "@/test/testUtils";
import { UniqueChance } from "@/test/UniqueChance";

const SEED = 12345;
const chance = new UniqueChance(SEED);

export const componentGetters = {
  getTitleElement(projectName: string) {
    return screen.getByRole("heading", { name: projectName });
  },
  getEditProjectButton() {
    return screen.getByRole("button", { name: /edit the project/i });
  },
  getDeleteProjectButton() {
    return screen.getByRole("button", { name: /delete the project/i });
  },
  getAddTaskButton() {
    return screen.getByRole("button", { name: /add task/i });
  },
  getTitleForm() {
    return screen.getByTestId("titleForm");
  },
  getEditProjectDialog() {
    return screen.getByTestId("editProjectForm");
  },
  getOngoingTasksList() {
    return screen.getByTestId("ongoingTasks");
  },
  getCompletedTasksList() {
    return screen.getByTestId("completedTasks");
  },
  findCompletedTasksList() {
    return screen.findByTestId("completedTasks");
  },

  getOngoingTasks() {
    const ongoingTasksList = componentGetters.getOngoingTasksList();

    return within(ongoingTasksList).getAllByRole("listitem");
  },
  getCompletedTasks() {
    const completedTasksList = componentGetters.getCompletedTasksList();

    return within(completedTasksList).getAllByRole("listitem");
  },
  getCompletionCheckbox(task: HTMLElement, name?: string | RegExp) {
    if (name) {
      return within(task).getByRole("checkbox", { name });
    }
    return within(task).getByRole("checkbox");
  },
  getOngoingTaskTitle(title: string) {
    const ongoingTasksList = componentGetters.getOngoingTasksList();

    return within(ongoingTasksList).getByRole("heading", { name: title });
  },
  queryOngoingTaskTitle(title: string) {
    const ongoingTasksList = componentGetters.getOngoingTasksList();

    return within(ongoingTasksList).queryByRole("heading", { name: title });
  },
  async findCompletedTaskTitle(title: string) {
    const completedTasksList = await componentGetters.findCompletedTasksList();

    return within(completedTasksList).findByRole("heading", { name: title });
  },
  queryCompletedTaskTitle(title: string) {
    const completedTasksList = componentGetters.getCompletedTasksList();

    return within(completedTasksList).queryByRole("heading", { name: title });
  },

  getFormsAndTasksInTheOngoingList() {
    const ongoingList = componentGetters.getOngoingTasksList();

    return within(ongoingList).getAllByTestId(/(addTaskForm|task)/);
  },
  getAddTaskForm() {
    return screen.getByTestId("addTaskForm");
  },
  getEditTaskForm() {
    const ongoingList = componentGetters.getOngoingTasksList();

    return within(ongoingList).getByTestId("editTaskForm");
  },

  getInputWithin(element: HTMLElement, name?: string | RegExp) {
    if (name) {
      return within(element).getByRole("textbox", { name }) as HTMLInputElement;
    }
    return within(element).getByRole("textbox") as HTMLInputElement;
  },
  getButtonWithin(element: HTMLElement, buttonName: string | RegExp) {
    return within(element).getByRole("button", { name: buttonName });
  },
};

export async function renderComponent() {
  const projectData = db.project.getAll()[0];
  const tasksInTheProjectData = db.task.findMany({
    where: {
      projectId: {
        equals: projectData.id,
      },
    },
  });

  render(
    <>
      <div id="root" />
      <MemoryRouter initialEntries={[`/projects/${projectData.id}`]}>
        <Routes>
          <Route
            path="projects/:projectId"
            element={
              <>
                <Modals />
                <Project />
              </>
            }
          />
        </Routes>
      </MemoryRouter>
    </>,
  );

  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  await waitForApiCallsFinish();

  return {
    projectData,
    tasksInTheProjectData,
  };
}

function typeInWithReplacement(inputField: HTMLInputElement, text: string) {
  inputField.setSelectionRange(0, inputField.value.length);
  userEvent.type(inputField, text);
}

export function getTaskTitleText(task: HTMLElement) {
  return within(task).getByRole("heading").textContent as string;
}

/**
 * Changes the project name through the editable title.
 *
 * @return A new title.
 */
export async function changeProjectNameThroughEditableTitle(
  oldProjectName: string,
) {
  const { getTitleElement, getTitleForm, getInputWithin, getButtonWithin } =
    componentGetters;

  userEvent.click(getTitleElement(oldProjectName));

  const form = getTitleForm();
  const inputField = getInputWithin(form);
  const submitButton = getButtonWithin(form, /save/i);

  const newTitle = chance.word();
  typeInWithReplacement(inputField, newTitle);
  userEvent.click(submitButton);

  await waitForApiCallsFinish();

  return newTitle;
}

/**
 * Changes the project name through the 'Edit project' dialog.
 *
 * @return A new title.
 */
export async function changeProjectNameThroughEditDialog() {
  const {
    getEditProjectButton,
    getEditProjectDialog,
    getInputWithin,
    getButtonWithin,
  } = componentGetters;

  userEvent.click(getEditProjectButton());

  const editProjectDialog = getEditProjectDialog();
  const inputField = getInputWithin(editProjectDialog, /name/i);
  const submitButton = getButtonWithin(editProjectDialog, /submit/i);

  const newTitle = chance.word();
  typeInWithReplacement(inputField, newTitle);
  userEvent.click(submitButton);

  await waitForApiCallsFinish();

  return newTitle;
}

/**
 * Marks the task with the specified index as completed.
 */
export function markTaskAsCompleted(taskIndex: number) {
  const { getOngoingTasks, getCompletionCheckbox } = componentGetters;

  const ongoingTasksBefore = getOngoingTasks();
  const task = ongoingTasksBefore[taskIndex];
  const taskTitle = getTaskTitleText(task);
  const completionCheckbox = getCompletionCheckbox(
    task,
    /mark the task as complete/i,
  );

  userEvent.click(completionCheckbox);

  return {
    ongoingTasksBefore,
    taskTitle,
  };
}

/**
 * Marks the task with the specified index as ongoing.
 */
export function markTaskAsOngoing(taskIndex: number) {
  const { getCompletedTasks, getCompletionCheckbox } = componentGetters;

  const completedTasksBefore = getCompletedTasks();
  const task = completedTasksBefore[taskIndex];
  const taskTitle = getTaskTitleText(task);
  const completionCheckbox = getCompletionCheckbox(
    task,
    /mark the task as incomplete/i,
  );

  userEvent.click(completionCheckbox);

  return {
    completedTasksBefore,
    taskTitle,
  };
}

/**
 * Opens the popup menu for the handed task.
 *
 * @returns The popup menu element.
 */
function openPopupMenu(task: HTMLElement) {
  const openMenuButton = componentGetters.getButtonWithin(
    task,
    /open the menu/i,
  );
  act(() => userEvent.click(openMenuButton));

  return screen.getByRole("menu");
}

/**
 * Fills and submits the task form.
 *
 * @return The name of the newly created task.
 */
export function fillInAndSubmitTaskForm(form: HTMLElement) {
  const taskNameField = componentGetters.getInputWithin(form, /task name/i);
  const submitButton = componentGetters.getButtonWithin(form, /add|save/i);

  const taskName = chance.word();
  typeInWithReplacement(taskNameField, taskName);

  userEvent.click(submitButton);

  return taskName;
}

type ClickOptionInTaskPopupMenuBaseParams = {
  optionName: string | RegExp;
};
type ClickOptionInTaskPopupMenuParamsWithPassedTask = {
  taskElement: HTMLElement;
  taskList?: undefined;
  taskIndex?: undefined;
};
type ClickOptionInTaskPopupMenuParamsWithPassedIndex = {
  taskElement?: undefined;
  taskList: "ongoing" | "completed";
  taskIndex: number;
};
type ClickOptionInTaskPopupMenuParams =
  | (ClickOptionInTaskPopupMenuBaseParams &
      ClickOptionInTaskPopupMenuParamsWithPassedTask)
  | (ClickOptionInTaskPopupMenuBaseParams &
      ClickOptionInTaskPopupMenuParamsWithPassedIndex);

/**
 * Clicks the specified option in a task popup menu.
 *
 * @returns The title of the task.
 */
export function clickOptionInTaskPopupMenu(
  params: ClickOptionInTaskPopupMenuParams,
) {
  let task;
  if (params.taskElement) {
    task = params.taskElement;
  } else if (params.taskList === "ongoing") {
    task = componentGetters.getOngoingTasks()[params.taskIndex];
  } else {
    task = componentGetters.getCompletedTasks()[params.taskIndex];
  }

  const popupMenu = openPopupMenu(task);
  const menuOption = within(popupMenu).getByRole("menuitem", {
    name: params.optionName,
  });

  act(() => userEvent.click(menuOption));

  return getTaskTitleText(task);
}

/**
 * Deletes the specified task.
 *
 * @returns The title of the deleted task.
 */
export function deleteTask(
  taskIndex: number,
  taskList: "ongoing" | "completed" = "ongoing",
) {
  const taskTitle = clickOptionInTaskPopupMenu({
    optionName: /delete task/i,
    taskIndex,
    taskList,
  });

  const dialog = screen.getByRole("dialog");
  const deleteButton = componentGetters.getButtonWithin(dialog, /delete/i);

  userEvent.click(deleteButton);

  return taskTitle;
}

/**
 * Adds a new task through the 'Add task' button.
 *
 * @returns The title of the new task.
 */
export function addTaskThroughAddTaskButton() {
  const addTaskButton = componentGetters.getAddTaskButton();
  userEvent.click(addTaskButton);

  const form = componentGetters.getAddTaskForm();

  return fillInAndSubmitTaskForm(form);
}
