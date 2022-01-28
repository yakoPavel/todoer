import { BaseEntry } from "@/types";

export type Project = {
  taskIds: string[];
  name: string;
  color: string;
  isFavorite: boolean;
} & BaseEntry;

export type Label = {
  color: string;
  name: string;
  isFavorite: boolean;
} & BaseEntry;

export type Task = {
  projectId: string;
  labelId?: string;
  name: string;
  description: string;
  done?: boolean;
} & BaseEntry;
