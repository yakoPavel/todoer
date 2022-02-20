export function generateLinkPath(
  type: "project" | "task" | "label",
  id: string,
) {
  switch (type) {
    case "project":
    case "task":
      return `/projects/${id}`;
    case "label":
      return `/labels/${id}`;
  }
}
