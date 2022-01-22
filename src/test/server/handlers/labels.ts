import { Value } from "@mswjs/data/lib/glossary";
import { omit } from "lodash";
import { rest } from "msw";

import { db, Models, persistDb } from "../db";
import { delayedResponse, getUser } from "../utils";

type LabelBody = {
  color: string;
  name: string;
  isFavorite?: boolean;
};

type LabelToPatchBody = {
  id: string;
  color?: string;
  name?: string;
  isFavorite?: boolean;
};

function stripData(project: Value<Models["label"], Models>) {
  return omit(project, "userId");
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
        id: {
          equals: labelToGetId,
        },
      },
    });

    if (!result) {
      return delayedResponse(ctx.status(404));
    }

    return delayedResponse(ctx.json(stripData(result)));
  }),

  rest.post<LabelBody>("/labels", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const { isFavorite = false, ...otherData } = req.body;

    const result = db.label.create({
      userId: user.id,
      isFavorite,
      ...otherData,
    });

    user.labelIds.push(result.id);

    persistDb("label");
    persistDb("user");

    return delayedResponse(ctx.status(201), ctx.json(stripData(result)));
  }),

  rest.patch<LabelToPatchBody>("/labels", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const { id: labelToPatchId, ...otherData } = req.body;

    const result = db.label.update({
      where: {
        userId: {
          equals: user.id,
        },
        id: {
          equals: labelToPatchId,
        },
      },
      data: otherData,
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
        id: {
          equals: labelToDeleteId,
        },
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
