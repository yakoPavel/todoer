import { Value } from "@mswjs/data/lib/glossary";
import { omit } from "lodash";
import { rest } from "msw";

import { db, Models, persistDb } from "../db";
import {
  delayedResponse,
  getUser,
  getFindByIdFilter,
  shiftElementsPositionRelative,
  correctElementsPosition,
  correctPosition,
  correctElementsPositionAfterDeletion,
} from "../utils";

import { CreateTaskBody, PatchTaskBody } from "@/types";

function stripData(task: Value<Models["task"], Models>) {
  return omit(task, ["userId", "tempId"]);
}

const taskHandlers = [
  // Returns all tasks
  rest.get("/tasks", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const projectId = req.url.searchParams.get("projectId");

    const result = db.task
      .findMany({
        where: {
          userId: {
            equals: user.id,
          },
          ...(projectId
            ? {
                projectId: {
                  equals: projectId,
                },
              }
            : {}),
        },
        orderBy: {
          position: "asc",
        },
      })
      .map(stripData);

    return delayedResponse(ctx.json(result));
  }),

  // Returns a concrete task
  rest.get<never, { taskId: string }>("/tasks/:taskId", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const { taskId } = req.params;

    const result = db.task.findFirst({
      where: {
        userId: {
          equals: user.id,
        },
        ...getFindByIdFilter(taskId),
      },
    });

    if (!result) {
      return delayedResponse(ctx.status(404));
    }

    return delayedResponse(ctx.json(stripData(result)));
  }),

  // Creates a new task
  rest.post<CreateTaskBody>("/tasks", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const { direction, triggerId, ...otherData } = req.body;

    let position = db.task.findMany({
      where: {
        userId: {
          equals: user.id,
        },
        projectId: {
          equals: otherData.projectId,
        },
        done: { equals: false },
      },
    }).length;

    if (direction && triggerId) {
      try {
        position = shiftElementsPositionRelative({
          insertionDirection: direction,
          itemType: "task",
          triggerId,
          userId: user.id,
          additionalFilters: {
            done: { equals: false },
            projectId: { equals: otherData.projectId },
          },
        });
      } catch (_) {
        return delayedResponse(
          ctx.status(201),
          ctx.json({
            message: `Can't insert a new task ${direction} this one. It wasn't found.`,
          }),
        );
      }
    }

    const result = db.task.create({
      done: false,
      userId: user.id,
      position,
      ...otherData,
    });

    db.project.update({
      where: {
        id: {
          equals: otherData.projectId,
        },
      },
      data: {
        taskIds(prevValue) {
          return [...prevValue, result.id];
        },
      },
    });

    persistDb("task");
    persistDb("project");

    return delayedResponse(ctx.status(201), ctx.json(stripData(result)));
  }),

  // Updates the specified task
  rest.patch<PatchTaskBody>("/tasks", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const { id: taskToUpdateId, position, done, ...otherData } = req.body;

    const taskUnderUpdate = db.task.findFirst({
      where: {
        userId: { equals: user.id },
        id: { equals: taskToUpdateId },
      },
    });

    if (!taskUnderUpdate) {
      return delayedResponse(ctx.status(404));
    }

    if (position !== undefined) {
      correctElementsPosition({
        userId: user.id,
        newPosition: position,
        itemId: taskToUpdateId,
        itemType: "task",
      });
    }

    // If the task moves to another list (from not done to done or vice versa),
    // we need to update position of the items from the list where the task
    // was before.
    let taskMovedToAnotherList = false;
    if (done !== undefined && done !== taskUnderUpdate.done) {
      correctElementsPositionAfterDeletion({
        userId: user.id,
        deletedItemPosition: taskUnderUpdate.position,
        itemType: "task",
        additionalFilters: {
          done: { equals: taskUnderUpdate.done },
          projectId: { equals: taskUnderUpdate.projectId },
        },
      });
      taskMovedToAnotherList = true;
    }

    const result = db.task.update({
      where: {
        userId: {
          equals: user.id,
        },
        ...getFindByIdFilter(taskToUpdateId),
      },
      data: {
        ...(otherData as any),
        done,
        position: (prevValue: number) => {
          if (position !== undefined) {
            return correctPosition("task", position);
          }
          // Place it at the end of the corresponding list
          if (taskMovedToAnotherList) {
            return db.task.findMany({
              where: {
                userId: { equals: user.id },
                projectId: { equals: taskUnderUpdate.projectId },
                done: { equals: done },
              },
            }).length;
          }

          return prevValue;
        },
      },
    });

    if (!result) {
      return delayedResponse(ctx.status(404));
    }

    persistDb("task");

    return delayedResponse(ctx.json(stripData(result)));
  }),

  rest.delete<never, { id: string }>("/tasks/:id", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const { id: taskToDeleteId } = req.params;

    const result = db.task.delete({
      where: {
        userId: {
          equals: user.id,
        },
        ...getFindByIdFilter(taskToDeleteId),
      },
    });

    if (!result) {
      return delayedResponse(ctx.status(404));
    }

    correctElementsPositionAfterDeletion({
      userId: user.id,
      deletedItemPosition: result.position,
      itemType: "task",
      additionalFilters: { done: { equals: result.done } },
    });

    db.project.update({
      where: {
        id: {
          equals: result.projectId,
        },
      },
      data: {
        taskIds(prevValue) {
          return prevValue.filter((taskId) => taskId !== result.id);
        },
      },
    });

    persistDb("task");
    persistDb("project");

    return delayedResponse(ctx.json(stripData(result)));
  }),
];

export { taskHandlers };
