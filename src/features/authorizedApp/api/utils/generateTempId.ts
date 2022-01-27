import { nanoid } from "nanoid";

import { OPTIMISTIC_UPDATES_PREFIX } from "@/config/misc";

export const generateTempId = () => `${OPTIMISTIC_UPDATES_PREFIX}${nanoid}`;
