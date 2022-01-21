import { context, createResponseComposition, RestRequest } from "msw";

import { db } from "./db";

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
