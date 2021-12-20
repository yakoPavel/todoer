import { capitalize, startCase } from "lodash";
import * as themeColors from "style/colors";

/**
 * This arg type defines a control that allows us to change the theme of the
 * app manually.
 */
export const themeSwitcherArgType = {
  __theme__: {
    control: {
      type: "select",
      defaultValue: "lightTheme",
      description: "Change the theme",
      options: [...Object.keys(themeColors)],
      labels: Object.fromEntries(
        Object.keys(themeColors).map((themeName) => [
          themeName,
          capitalize(startCase(themeName)),
        ]),
      ),
    },
  },
};
