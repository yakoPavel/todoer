export type BaseEntry = {
  id: string;
  createdAt: number;
};

/* API DTOs below */
type WithDirection = {
  direction: "above" | "below";
  triggerId: string;
};

type WithoutDirection = {
  direction?: never;
  triggerId?: never;
};

/* Project */

type CreateProjectBodyBase = {
  tempId: string;
  name: string;
  color: string;
  isFavorite?: boolean;
};

export type CreateProjectBody =
  | (CreateProjectBodyBase & WithDirection)
  | (CreateProjectBodyBase & WithoutDirection);

export type PatchProjectBody = {
  id: string;
  name?: string;
  color?: string;
  isFavorite?: boolean;
  taskIds?: string[];
  position?: number;
};

/* Label */

type CreateLabelBodyBase = {
  tempId: string;
  color: string;
  name: string;
  isFavorite?: boolean;
};

export type CreateLabelBody =
  | (CreateLabelBodyBase & WithDirection)
  | (CreateLabelBodyBase & WithoutDirection);

export type PatchLabelBody = {
  id: string;
  color?: string;
  name?: string;
  isFavorite?: boolean;
  position?: number;
};

/* Task */

type CreateTaskBodyBase = {
  tempId: string;
  projectId: string;
  labelId?: string;
  name: string;
  description: string;
  done?: boolean;
};

export type CreateTaskBody =
  | (CreateTaskBodyBase & WithDirection)
  | (CreateTaskBodyBase & WithoutDirection);

export type PatchTaskBody = {
  id: string;
  projectId?: string;
  labelId?: string;
  name?: string;
  description?: string;
  done?: boolean;
  position?: number;
};
