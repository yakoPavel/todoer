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
