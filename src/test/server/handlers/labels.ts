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

import { CreateLabelBody, PatchLabelBody } from "@/types";

function stripData(project: Value<Models["label"], Models>) {
  return omit(project, ["userId", "tempId"]);
}

const labelHandlers = [
  rest.get("/labels", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const result = db.label
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

  rest.get<never, { id: string }>("/labels/:id", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const { id: labelToGetId } = req.params;

    const result = db.label.findFirst({
      where: {
        userId: {
          equals: user.id,
        },
        ...getFindByIdFilter(labelToGetId),
      },
    });

    if (!result) {
      return delayedResponse(ctx.status(404));
    }

    return delayedResponse(ctx.json(stripData(result)));
  }),

  rest.post<CreateLabelBody>("/labels", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const { isFavorite = false, direction, triggerId, ...otherData } = req.body;

    let position = db.label.count();

    if (direction && triggerId) {
      try {
        position = shiftElementsPositionRelative({
          insertionDirection: direction,
          itemType: "label",
          triggerId,
          userId: user.id,
        });
      } catch (_) {
        return delayedResponse(
          ctx.status(201),
          ctx.json({
            message: `Can't insert a new label ${direction} this one. It wasn't found.`,
          }),
        );
      }
    }

    const result = db.label.create({
      userId: user.id,
      position,
      isFavorite,
      ...otherData,
    });

    user.labelIds.push(result.id);

    persistDb("label");
    persistDb("user");

    return delayedResponse(ctx.status(201), ctx.json(stripData(result)));
  }),

  rest.patch<PatchLabelBody>("/labels", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const { id: labelToPatchId, position, ...otherData } = req.body;

    if (position !== undefined) {
      correctElementsPosition({
        itemType: "label",
        newPosition: position,
        itemId: labelToPatchId,
        userId: user.id,
      });
    }

    const result = db.label.update({
      where: {
        userId: {
          equals: user.id,
        },
        ...getFindByIdFilter(labelToPatchId),
      },
      data: {
        ...(otherData as any),
        position: (prevData) =>
          position !== undefined
            ? correctPosition("label", position)
            : prevData,
      },
    });

    if (!result) {
      return delayedResponse(ctx.status(404));
    }

    persistDb("label");

    return delayedResponse(ctx.json(stripData(result)));
  }),

  rest.delete<never, { id: string }>("/labels/:id", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const { id: labelToDeleteId } = req.params;

    const result = db.label.delete({
      where: {
        userId: {
          equals: user.id,
        },
        ...getFindByIdFilter(labelToDeleteId),
      },
    });

    if (!result) {
      return delayedResponse(ctx.status(404));
    }

    db.task.updateMany({
      where: {
        userId: {
          equals: user.id,
        },
        labelId: {
          equals: result.id,
        },
      },
      data: {
        labelId: null,
      },
    });

    user.labelIds = user.labelIds.filter((labelId) => labelId !== result.id);

    persistDb("label");
    persistDb("task");
    persistDb("user");

    return delayedResponse(ctx.json(stripData(result)));
  }),
];

export { labelHandlers };
