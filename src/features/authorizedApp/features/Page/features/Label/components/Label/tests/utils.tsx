import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { Label } from "../Label";

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
  getEditLabelButton() {
    return screen.getByRole("button", { name: /edit the label/i });
  },
  getDeleteLabelButton() {
    return screen.getByRole("button", { name: /delete the label/i });
  },
  getTitleForm() {
    return screen.getByTestId("titleForm");
  },
  getEditLabelDialog() {
    return screen.getByTestId("editLabelForm");
  },
  getOngoingTasksList() {
    return screen.getByTestId("ongoingTasks");
  },
  getCompletedTasksList() {
    return screen.getByTestId("completedTasks");
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
  getCompletedTaskTitle(title: string) {
    const completedTasksList = componentGetters.getCompletedTasksList();

    return within(completedTasksList).getByRole("heading", { name: title });
  },
  queryCompletedTaskTitle(title: string) {
    const completedTasksList = componentGetters.getCompletedTasksList();

    return within(completedTasksList).queryByRole("heading", { name: title });
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
  const labelData = db.label.getAll()[0];
  const tasksWithTheLabelData = db.task.findMany({
    where: {
      labelId: {
        equals: labelData.id,
      },
    },
  });

  render(
    <>
      <div id="root" />
      <MemoryRouter initialEntries={[`/labels/${labelData.id}`]}>
        <Routes>
          <Route
            path="labels/:labelId"
            element={
              <>
                <Modals />
                <Label />
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
    labelData,
    tasksWithTheLabelData,
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
 * Changes the label name through the editable title.
 *
 * @return A new title.
 */
export async function changeLabelNameThroughEditableTitle(
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
 * Changes the label name through the 'Edit label' dialog.
 *
 * @return A new title.
 */
export async function changeLabelNameThroughEditDialog() {
  const {
    getEditLabelButton,
    getEditLabelDialog,
    getInputWithin,
    getButtonWithin,
  } = componentGetters;

  userEvent.click(getEditLabelButton());

  const editLabelDialog = getEditLabelDialog();
  const inputField = getInputWithin(editLabelDialog, /name/i);
  const submitButton = getButtonWithin(editLabelDialog, /submit/i);

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
