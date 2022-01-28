import { context, createResponseComposition, RestRequest } from "msw";

import { db } from "./db";

import { OPTIMISTIC_UPDATES_PREFIX } from "@/config/misc";

const isTesting =
  process.env.NODE_ENV === "test" || ((window as any).Cypress as any);

export const delayedResponse = createResponseComposition(undefined, [
  context.delay(isTesting ? 0 : 1000),
]);

// We are using an auth token as a user id in this test server.
// In the real server it is necessary to validate this token and to
// extract a user id from it.
export const getUser = (req: RestRequest) => {
  const token = req.headers.get("Authentication");
  if (!token) return null;

  let user = db.user.findFirst({
    where: {
      id: {
        equals: token,
      },
    },
  });

  if (!user) {
    user = db.user.create({
      id: token,
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

type ShiftElementPositionOptions = {
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
export function shiftElementsPosition({
  insertionDirection,
  userId,
  triggerId,
  itemType,
}: ShiftElementPositionOptions) {
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
    },
    data: {
      position: (prevValue: number) => prevValue + 1,
    },
  });

  return insertionDirection === "above"
    ? triggerItemPosition
    : triggerItemPosition + 1;
}
