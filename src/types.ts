import { SyntheticEvent } from "react";

import { LABEL_COLORS } from "@/config/labelColors";

export type { ThemeColors } from "@/style/colors";

/**
 * A react event with the `processed` field. This field signals that the
 * event has been already handled.
 */
export type EventWithProcessedField<EventType extends SyntheticEvent> =
  EventType & { processed?: boolean };

/**
 * A color value of a task label.
 */
export type Color = typeof LABEL_COLORS[number]["value"];

export type BaseEntry = {
  id: string;
  createdAt: number;
};

/* API DTOs below */
export type CreateProjectBody = {
  name: string;
  color: string;
  isFavorite?: boolean;
};

export type PatchProjectBody = {
  id: string;
  name?: string;
  color?: string;
  isFavorite?: boolean;
  taskIds?: string[];
};

export type CreateLabelBody = {
  color: string;
  name: string;
  isFavorite?: boolean;
};

export type PatchLabelBody = {
  id: string;
  color?: string;
  name?: string;
  isFavorite?: boolean;
};

export type CreateTaskBody = {
  projectId: string;
  labelId?: string;
  name: string;
  description: string;
  done?: boolean;
};

export type PatchTaskBody = {
  id: string;
  projectId?: string;
  labelId?: string;
  name?: string;
  description?: string;
  done?: boolean;
};
