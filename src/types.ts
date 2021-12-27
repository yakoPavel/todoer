import { SyntheticEvent } from "react";

export type { ThemeColors } from "style/colors";

/**
 * A react event with the `processed` field. This field signals that the
 * event has been already handled.
 */
export type EventWithProcessedField<EventType extends SyntheticEvent> =
  EventType & { processed?: boolean };
