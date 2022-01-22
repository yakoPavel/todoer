import { Value } from "@mswjs/data/lib/glossary";
import { omit } from "lodash";
import { rest } from "msw";

import { db, Models, persistDb } from "../db";
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
  taskIds?: string[];
};

function stripData(project: Value<Models["project"], Models>) {
  return omit(project, "userId");
}

const projectHandlers = [
  rest.get("/projects", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const result = db.project
      .findMany({
        where: {
          userId: {
            equals: user.id,
          },
        },
      })
      .map(stripData);

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
        userId: {
          equals: user.id,
        },
        id: {
          equals: projectToGetId,
        },
      },
    });

    if (!result) {
      return delayedResponse(ctx.status(404));
    }

    return delayedResponse(ctx.json(stripData(result)));
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
      userId: user.id,
    });

    user.projectIds.push(result.id);

    persistDb("project");
    persistDb("user");

    return delayedResponse(ctx.status(201), ctx.json(stripData(result)));
  }),

  rest.patch<ProjectToPatchBody>("/projects", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const { id: projectToPatchId, taskIds = [], ...otherData } = req.body;

    const result = db.project.update({
      where: {
        id: {
          equals: projectToPatchId,
        },
        userId: {
          equals: user.id,
        },
      },
      data: {
        taskIds(prevValue) {
          return [...prevValue, ...taskIds];
        },
        // For some reason the type of the data object doesn't accept an
        // updater function and regular properties together.
        ...(otherData as any),
      },
    });

    if (!result) {
      return delayedResponse(ctx.status(404));
    }

    persistDb("project");

    return delayedResponse(ctx.json(stripData(result)));
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
        userId: {
          equals: user.id,
        },
      },
    });

    if (!result) {
      return delayedResponse(ctx.status(404));
    }

    db.task.deleteMany({
      where: {
        projectId: {
          equals: projectToDeleteId,
        },
        userId: {
          equals: user.id,
        },
      },
    });

    user.projectIds = user.projectIds.filter(
      (projectId) => projectId !== result.id,
    );

    persistDb("project");
    persistDb("task");
    persistDb("user");

    return delayedResponse(ctx.json(stripData(result)));
  }),
];

export { projectHandlers };
