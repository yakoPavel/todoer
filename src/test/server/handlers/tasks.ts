import { Value } from "@mswjs/data/lib/glossary";
import { omit } from "lodash";
import { rest } from "msw";

import { db, Models, persistDb } from "../db";
import { delayedResponse, getUser } from "../utils";

type TaskBody = {
  project: string;
  name: string;
  description: string;
  done?: boolean;
  label?: string;
};

type TaskToPatchBody = {
  id: string;
  project?: string;
  name?: string;
  description?: string;
  done?: boolean;
  label?: string;
};

function getProjectById(userId: string, projectId: string) {
  return db.project.findFirst({
    where: {
      owner: {
        id: {
          equals: userId,
        },
      },
      id: {
        equals: projectId,
      },
    },
  });
}

function getLabelById(userId: string, labelId: string) {
  return db.label.findFirst({
    where: {
      owner: {
        id: {
          equals: userId,
        },
      },
      id: {
        equals: labelId,
      },
    },
  });
}

/**
 * Updates the list with tasks in the specified project.
 *
 * @param userId - An id of the user.
 * @param projectId - An id of the project.
 * @param newTasks - A list with new tasks. The old list will be replaced with this value.
 */
function updateTasksInTheProject(
  userId: string,
  projectId: string,
  newTasks: Value<Models["task"], Models>[],
) {
  db.project.update({
    where: {
      owner: {
        id: {
          equals: userId,
        },
      },
      id: {
        equals: projectId,
      },
    },
    data: {
      tasks: newTasks,
    },
  });

  persistDb("project");
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

      const result = db.task.findMany({
        where: {
          owner: {
            id: {
              equals: user.id,
            },
          },
          project: {
            id: {
              equals: projectId,
            },
          },
        },
      });

      return delayedResponse(ctx.json(omit(result, "owner")));
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
          owner: {
            id: {
              equals: user.id,
            },
          },
          project: {
            id: {
              equals: projectId,
            },
          },
          id: {
            equals: taskId,
          },
        },
      });

      if (!result) {
        return delayedResponse(ctx.status(404));
      }

      return delayedResponse(ctx.json(omit(result, "owner")));
    },
  ),

  // Creates new task
  rest.post<TaskBody>("/tasks", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const {
      project: projectId,
      name,
      description,
      done = false,
      label: labelId,
    } = req.body;

    const label = labelId ? getLabelById(user.id, labelId) : null;

    if (labelId && !label) {
      return delayedResponse(
        ctx.status(404),
        ctx.json({
          errorMessage: `The label with the id ${labelId} wasn't found.`,
        }),
      );
    }

    const project = getProjectById(user.id, projectId);

    if (!project) {
      return delayedResponse(
        ctx.status(404),
        ctx.json({
          errorMessage: `The project with the id ${projectId} wasn't found.`,
        }),
      );
    }

    const result = db.task.create({
      project,
      name,
      description,
      done,
      label,
    });

    // Adding the new task to the project tasks list
    updateTasksInTheProject(user.id, projectId, [
      ...(project.tasks ?? []),
      result,
    ]);

    persistDb("task");

    return delayedResponse(ctx.json(omit(result, "owner")));
  }),

  // Updates the specified task
  rest.patch<TaskToPatchBody>("/tasks", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const {
      id: taskToUpdateId,
      project: projectId,
      label: labelId,
      ...data
    } = req.body;

    const project = projectId ? getProjectById(user.id, projectId) : null;
    if (projectId && !project) {
      return delayedResponse(
        ctx.status(404),
        ctx.json({
          errorMessage: `The project with the id ${projectId} wasn't found.`,
        }),
      );
    }

    const label = labelId ? getLabelById(user.id, labelId) : null;
    if (labelId && !label) {
      return delayedResponse(
        ctx.status(404),
        ctx.json({
          errorMessage: `The label with the id ${labelId} wasn't found.`,
        }),
      );
    }

    const result = db.task.update({
      where: {
        owner: {
          id: {
            equals: user.id,
          },
        },
        id: {
          equals: taskToUpdateId,
        },
      },
      data: {
        project: project ?? undefined,
        label,
        ...data,
      },
    });

    return delayedResponse(ctx.json(omit(result, "owner")));
  }),

  rest.delete<never, { id: string }>("/tasks/:id", (req, res, ctx) => {
    const user = getUser(req);
    if (!user) {
      return delayedResponse(ctx.status(401));
    }

    const { id: taskToDeleteId } = req.params;

    const result = db.task.delete({
      where: {
        owner: {
          id: {
            equals: user.id,
          },
        },
        id: {
          equals: taskToDeleteId,
        },
      },
    });

    if (!result) {
      return delayedResponse(ctx.status(404));
    }

    return delayedResponse(ctx.json(omit(result, "owner")));
  }),
];

export { taskHandlers };
