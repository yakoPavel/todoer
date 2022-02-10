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

    const { done = false, direction, triggerId, ...otherData } = req.body;

    let position = db.task.count();

    if (direction && triggerId) {
      try {
        position = shiftElementsPositionRelative({
          insertionDirection: direction,
          itemType: "task",
          triggerId,
          userId: user.id,
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
      done,
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

    const { id: taskToUpdateId, position, ...otherData } = req.body;

    if (position !== undefined) {
      correctElementsPosition({
        userId: user.id,
        newPosition: position,
        itemId: taskToUpdateId,
        itemType: "task",
      });
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
        position: (prevValue: number) =>
          position !== undefined
            ? correctPosition("task", position)
            : prevValue,
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
