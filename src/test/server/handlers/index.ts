import { labelHandlers } from "./labels";
import { projectHandlers } from "./projects";
import { taskHandlers } from "./tasks";

export const handlers = [...projectHandlers, ...labelHandlers, ...taskHandlers];
