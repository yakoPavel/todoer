import { Value } from "@mswjs/data/lib/glossary";
import { rest } from "msw";

import { db, Models, persistDb } from "../db";
import { delayedResponse, getUser } from "../utils";

type TaskBody = {
  projectId: string;
  labelId?: string;
  name: string;
  description: string;
  done?: boolean;
};

type TaskToPatchBody = {
  id: string;
  projectId?: string;
  labelId?: string;
  name?: string;
  description?: string;
  done?: boolean;
};

function stripData(task: Value<Models["task"], Models>) {
  const { userId, ...otherData } = task;
  return otherData;
}

const taskHandlers = [
  // Returns all tasks for the specified project
  rest.get<never, { projectId: string }>(
    "/tasks/:projectId/",
    (req, res, ctx) => {
      const user = getUser(req);
      if (!user) {
        return delayedResponse(ctx.status(401));
      }

      const { projectId } = req.params;

      const result = db.task
        .findMany({
          where: {
            userId: {
              equals: user.id,
            },
            projectId: {
              equals: projectId,
            },
          },
        })
        .map(stripData);

      return delayedResponse(ctx.json(result));
    },
  ),

  // Returns a concrete task for the specified project
  rest.get<never, { projectId: string; taskId: string }>(
    "/tasks/:projectId/:taskId",
    (req, res, ctx) => {
      const user = getUser(req);
      if (!user) {
        return delayedResponse(ctx.status(401));
      }

      const { projectId, taskId } = req.params;

      const result = db.task.findFirst({
        where: {
          userId: {
            equals: user.id,
          },
          projectId: {
            equals: projectId,
          },
          id: {
            equals: taskId,
          },
        },
      });

      if (!result) {
        return delayedResponse(ctx.status(404));
      }

      return delayedResponse(ctx.json(stripData(result)));
    },
  ),

  // Creates a new task
  rest.post<TaskBody>("/tasks", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const { done = false, ...otherData } = req.body;

    const result = db.task.create({
      done,
      ...otherData,
    });

    db.project.update({
      where: {
        id: {
          equals: otherData.projectId,
        },
      },
      data: {
        taskIds(prevValue, project) {
          return [...prevValue, result.id];
        },
      },
    });

    persistDb("task");
    persistDb("project");

    return delayedResponse(ctx.status(201), ctx.json(stripData(result)));
  }),

  // Updates the specified task
  rest.patch<TaskToPatchBody>("/tasks", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const { id: taskToUpdateId, ...otherData } = req.body;

    const result = db.task.update({
      where: {
        userId: {
          equals: user.id,
        },
        id: {
          equals: taskToUpdateId,
        },
      },
      data: otherData,
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
        id: {
          equals: taskToDeleteId,
        },
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
