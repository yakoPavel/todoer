import { SyntheticEvent } from "react";

import { LABEL_COLORS } from "@/config/labelColors";
import * as themes from "@/style/colors";

export type { ThemeColors } from "@/style/colors";

type StripThemeName<FullName extends string> =
  FullName extends `${infer Name}Theme` ? Name : FullName;

export type ThemeName = StripThemeName<keyof typeof themes>;

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
