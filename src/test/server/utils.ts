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
      id: {
        equals: id,
      },
    };
  }
  return {
    tempId: {
      equals: id,
    },
  };
}
