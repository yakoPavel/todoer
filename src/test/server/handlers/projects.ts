import { omit } from "lodash";
import { rest } from "msw";

import { db, persistDb } from "../db";
import { delayedResponse, getUser } from "../utils";

type ProjectBody = {
  name: string;
  color: string;
  isFavorite?: boolean;
};

type ProjectToPatchBody = {
  id: string;
  name?: string;
  color?: string;
  isFavorite?: boolean;
  tasks: string[];
};

const projectHandlers = [
  rest.get("/projects", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const result = db.project
      .findMany({
        where: {
          owner: {
            id: {
              equals: user.id,
            },
          },
        },
      })
      .map((project) => omit(project, "owner"));

    return delayedResponse(ctx.json(result));
  }),

  rest.get<never, { id: string }>("/projects/:id", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const { id: projectToGetId } = req.params;

    const result = db.project.findFirst({
      where: {
        owner: {
          id: {
            equals: user.id,
          },
        },
        id: {
          equals: projectToGetId,
        },
      },
    });

    if (!result) {
      return delayedResponse(ctx.status(404));
    }

    return delayedResponse(ctx.json(omit(result, "owner")));
  }),

  rest.post<ProjectBody>("/projects", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const { color, name, isFavorite = false } = req.body;
    const result = db.project.create({
      name,
      color,
      isFavorite,
      tasks: [],
      owner: user,
    });

    persistDb("project");

    return delayedResponse(ctx.status(201), ctx.json(omit(result, "owner")));
  }),

  rest.patch<ProjectToPatchBody>("/projects", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const { id: projectToPatchId, tasks: tasksIds, ...data } = req.body;

    const getMergedTasks = () => {
      const project = db.project.findFirst({
        where: {
          id: {
            equals: projectToPatchId,
          },
        },
      });

      if (!project) {
        throw new Error("The specified project was not found.");
      }

      const { tasks = [] } = project;

      if (tasksIds) {
        const tasksToAdd = db.task.findMany({
          where: {
            id: {
              in: tasksIds,
            },
            owner: {
              id: {
                equals: user.id,
              },
            },
          },
        });

        if (tasksToAdd.length === 0) {
          throw new Error("The specified tasks was not found.");
        }

        tasks.push(...tasksToAdd);
      }

      return tasks;
    };

    let tasks;
    try {
      tasks = getMergedTasks();
    } catch (e) {
      return delayedResponse(
        ctx.status(404),
        ctx.json({ message: (e as Error).message }),
      );
    }

    const result = db.project.update({
      where: {
        id: {
          equals: projectToPatchId,
        },
        owner: {
          id: {
            equals: user.id,
          },
        },
      },
      data: {
        tasks,
        ...data,
      },
    });

    if (!result) {
      return delayedResponse(ctx.status(404));
    }

    persistDb("project");

    return delayedResponse(ctx.json(omit(result, "owner")));
  }),

  rest.delete<never, { id: string }>("/projects/:id", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const { id: projectToDeleteId } = req.params;

    const result = db.project.delete({
      where: {
        id: {
          equals: projectToDeleteId,
        },
        owner: {
          id: {
            equals: user.id,
          },
        },
      },
    });

    if (!result) {
      return delayedResponse(ctx.status(404));
    }

    persistDb("project");

    return delayedResponse(ctx.json(omit(result, "owner")));
  }),
];

export { projectHandlers };
