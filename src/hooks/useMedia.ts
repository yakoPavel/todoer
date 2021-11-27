import React from "react";

export const useMedia = (query: string) => {
  const mql = React.useMemo(() => window.matchMedia(query), [query]);
  const [matches, setMatches] = React.useState(mql.matches);

  React.useEffect(() => {
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    mql.addEventListener("change", handler);

    return () => mql.removeEventListener("change", handler);
  }, [mql]);

  return matches;
};
