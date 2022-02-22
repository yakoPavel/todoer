type GetTimeOfDayReturn<Exact extends boolean> = Exact extends true
  ? "morning" | "day" | "evening" | "night"
  : "day" | "night";

/**
 * Generates a textual representation of the passed time.
 *
 * @param time - A `Date` object for which the textual representation should be
 *  generated.
 * @param exact - If this value is `false` there will be only two possible
 * results: `day` or `night`.
 */
export function getTimeOfDay<Exact extends boolean = false>(
  time: Date,
  exact?: Exact,
): GetTimeOfDayReturn<Exact> {
  const currentHour = time.getHours();

  if (!exact) {
    if (currentHour <= 8 || currentHour >= 20) {
      return "night";
    }
    return "day";
  }

  if (currentHour >= 0 && currentHour < 6) {
    return "night";
  }
  if (currentHour >= 6 && currentHour < 12) {
    return "morning" as GetTimeOfDayReturn<Exact>;
  }
  if (currentHour >= 12 && currentHour < 18) {
    return "day";
  }
  return "evening" as GetTimeOfDayReturn<Exact>;
}
