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

import { CreateProjectBody, PatchProjectBody } from "@/types";

function stripData(project: Value<Models["project"], Models>) {
  return omit(project, ["userId", "tempId"]);
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
        orderBy: {
          position: "asc",
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
        ...getFindByIdFilter(projectToGetId),
      },
    });

    if (!result) {
      return delayedResponse(ctx.status(404));
    }

    return delayedResponse(ctx.json(stripData(result)));
  }),

  rest.post<CreateProjectBody>("/projects", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const { color, name, isFavorite = false, direction, triggerId } = req.body;

    let position = db.project.count();

    if (direction && triggerId) {
      try {
        position = shiftElementsPositionRelative({
          insertionDirection: direction,
          itemType: "project",
          triggerId,
          userId: user.id,
        });
      } catch (_) {
        return delayedResponse(
          ctx.status(201),
          ctx.json({
            message: `Can't insert a new project ${direction} this one. It wasn't found.`,
          }),
        );
      }
    }

    const result = db.project.create({
      name,
      color,
      isFavorite,
      position,
      userId: user.id,
    });

    user.projectIds.push(result.id);

    persistDb("project");
    persistDb("user");

    return delayedResponse(ctx.status(201), ctx.json(stripData(result)));
  }),

  rest.patch<PatchProjectBody>("/projects", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const {
      id: projectToPatchId,
      taskIds = [],
      position,
      ...otherData
    } = req.body;

    if (position !== undefined) {
      correctElementsPosition({
        userId: user.id,
        itemType: "project",
        itemId: projectToPatchId,
        newPosition: position,
      });
    }

    const result = db.project.update({
      where: {
        userId: {
          equals: user.id,
        },
        ...getFindByIdFilter(projectToPatchId),
      },
      data: {
        // For some reason the type of the data object doesn't accept an
        // updater function and regular properties together.
        ...(otherData as any),
        taskIds(prevValue) {
          return [...prevValue, ...taskIds];
        },
        position(prevValue) {
          return position !== undefined
            ? correctPosition("project", position)
            : prevValue;
        },
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
        userId: {
          equals: user.id,
        },
        ...getFindByIdFilter(projectToDeleteId),
      },
    });

    if (!result) {
      return delayedResponse(ctx.status(404));
    }

    correctElementsPositionAfterDeletion({
      userId: user.id,
      deletedItemPosition: result.position,
      itemType: "project",
    });

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
