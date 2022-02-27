/* eslint-disable @typescript-eslint/no-namespace */
import "./commands";

declare global {
  namespace Cypress {
    interface Chainable {
      login(): void;

      createItem(options: {
        type: "project" | "label";
        name: string;
        color?: string;
        isFavorite?: boolean;
      }): void;

      toggleSideMenuSection(name: "projects" | "labels" | "favorites"): void;
    }
  }
}
