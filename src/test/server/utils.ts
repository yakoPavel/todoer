import { context, createResponseComposition, RestRequest } from "msw";

import { db } from "./db";

import { OPTIMISTIC_UPDATES_PREFIX } from "@/config/misc";

const isTesting =
  process.env.NODE_ENV === "test" || ((window as any).Cypress as any);

export const delayedResponse = createResponseComposition(undefined, [
  context.delay(isTesting ? 0 : 1000),
]);

// We don't validate the auth token here and use a hardcoded USER_ID for
// simplicity. On the real backend we do all validations.
export const getUser = (req: RestRequest) => {
  const token = req.headers.get("Authentication");
  if (!token) return null;

  const USER_ID = "SOME_USER_ID";

  let user = db.user.findFirst({
    where: {
      id: {
        equals: USER_ID,
      },
    },
  });

  if (!user) {
    user = db.user.create({
      id: USER_ID,
    });
  }

  return user;
};

export function isTempId(idToCheck: string) {
  return (
    idToCheck.length > 21 && idToCheck.startsWith(OPTIMISTIC_UPDATES_PREFIX)
  );
}

/**
 * Returns a filter by the `id` field if the passed id is a permanent id,
 * otherwise returns a filter by the `tempId` field.
 *
 * @param id - A permanent or a temp id of a resource.
 *
 * @example
 * ```ts
 * const id = getId(); // Can be permanent or temp
 * const result = db.item.findFirst({
 *     where: {
 *       ...getFindByIdFilter(id)
 *     }
 *   }
 * )
 * ```
 */
export function getFindByIdFilter(id: string) {
  if (isTempId(id)) {
    return {
      tempId: {
        equals: id,
      },
    };
  }
  return {
    id: {
      equals: id,
    },
  };
}

type ShiftElementsPositionRelativeOptions = {
  /**
   * Where a new element will be inserted relative to the element with the
   * `triggerId` id.
   */
  insertionDirection: "above" | "below";
  /** An id of the user. */
  userId: string;
  /** An id of the element relative to which will be inserted a new one. */
  triggerId: string;
  /** A type of the item under update. */
  itemType: "project" | "label" | "task";
  /** Additional filters for items under update. */
  additionalFilters?: Record<string, unknown>;
};
/**
 * Shifts the position of elements in the database based on the insertion
 * direction.
 *
 * @param options - An object with options.
 *
 * @throws Throws an error if the element with the `triggerId` id wasn't found.
 *
 * @returns The position of a new element.
 */
export function shiftElementsPositionRelative({
  insertionDirection,
  userId,
  triggerId,
  itemType,
  additionalFilters,
}: ShiftElementsPositionRelativeOptions) {
  const triggerItem = db[itemType].findFirst({
    where: {
      userId: {
        equals: userId,
      },
      ...getFindByIdFilter(triggerId),
    },
  });

  if (!triggerItem) {
    throw new Error(`The item with the ${triggerId} id wasn't found.`);
  }

  const triggerItemPosition = triggerItem.position;

  db[itemType].updateMany({
    where: {
      userId: {
        equals: userId,
      },
      position:
        insertionDirection === "above"
          ? {
              gte: triggerItemPosition,
            }
          : {
              gt: triggerItemPosition,
            },
      ...additionalFilters,
    },
    data: {
      position: (prevValue: number) => prevValue + 1,
    },
  });

  return insertionDirection === "above"
    ? triggerItemPosition
    : triggerItemPosition + 1;
}

type CorrectElementsPositionOptions = {
  /** An id of the user. */
  userId: string;
  /** An id of the item whose position is changed. */
  itemId: string;
  /** A new position of the item. */
  newPosition: number;
  /** A type of the item under update. */
  itemType: "project" | "label" | "task";
  /** Additional filters for items under update. */
  additionalFilters?: Record<string, unknown>;
};
/**
 * Corrects the positions of the elements after one element's position has changed.
 * This function must be called before the new element's position was saved in the db.
 *
 * @throws Throws an error if the element with the `itemId` id wasn't found.
 */
export function correctElementsPosition({
  userId,
  itemId,
  newPosition,
  itemType,
  additionalFilters,
}: CorrectElementsPositionOptions) {
  const changedItem = db[itemType].findFirst({
    where: {
      userId: {
        equals: userId,
      },
      ...getFindByIdFilter(itemId),
    },
  });

  if (!changedItem) {
    throw new Error(`The item with the ${itemId} id wasn't found.`);
  }

  const oldPosition = changedItem.position;

  if (newPosition > oldPosition) {
    db[itemType].updateMany({
      where: {
        userId: {
          equals: userId,
        },
        position: {
          gt: oldPosition,
          lte: newPosition,
        },
        ...additionalFilters,
      },
      data: {
        position: (prevPosition: number) => prevPosition - 1,
      },
    });
  } else if (newPosition < oldPosition) {
    db[itemType].updateMany({
      where: {
        userId: {
          equals: userId,
        },
        position: {
          lt: oldPosition,
          gte: newPosition,
        },
        ...additionalFilters,
      },
      data: {
        position: (prevPosition: number) => prevPosition + 1,
      },
    });
  }
}

type CorrectElementsPositionAfterDeletionOptions = {
  /** An id of the user. */
  userId: string;
  /** A position of the deleted item. */
  deletedItemPosition: number;
  /** A type of the item under update. */
  itemType: "project" | "label" | "task";
  /** Additional filters for items under update. */
  additionalFilters?: Record<string, unknown>;
};
/**
 * Corrects the position of the elements after one of them has been deleted.
 */
export function correctElementsPositionAfterDeletion({
  userId,
  deletedItemPosition,
  itemType,
  additionalFilters,
}: CorrectElementsPositionAfterDeletionOptions) {
  db[itemType].updateMany({
    where: {
      userId: {
        equals: userId,
      },
      position: {
        gt: deletedItemPosition,
      },
      ...additionalFilters,
    },
    data: {
      position: (prevPosition: number) => prevPosition - 1,
    },
  });
}

/**
 * Corrects the position of the item if necessary.
 */
export function correctPosition(
  itemType: "project" | "label" | "task",
  position: number,
) {
  return Math.min(position, db[itemType].count() + 1);
}
