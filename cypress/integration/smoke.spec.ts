before(() => {
  indexedDB.deleteDatabase("firebaseLocalStorageDb");
});

describe("Smoke test", () => {
  it("Should correctly handle a normal app flow", () => {
    cy.visit("/");

    cy.login();

    // Open the side menu and all its sections
    cy.findByRole("button", { name: /open the menu/i }).click();
    cy.toggleSideMenuSection("favorites");
    cy.toggleSideMenuSection("projects");
    cy.toggleSideMenuSection("labels");

    // Creating items and verifying that they are rendered
    cy.createItem({ type: "project", name: "First project", isFavorite: true });
    cy.createItem({ type: "project", name: "Second project", color: "Gold" });

    cy.findByRole("region", { name: /projects/i })
      .as("projects")
      .within(() => {
        cy.findByRole("link", { name: "First project" }).as("firstProjectLink");
        cy.findByRole("link", { name: "Second project" });
      });

    cy.findByRole("region", { name: /favorites/i })
      .as("favorites")
      .within(() => cy.findByRole("link", { name: "First project" }));

    cy.createItem({ type: "label", name: "First label", isFavorite: true });
    cy.createItem({ type: "label", name: "Second label", color: "Gold" });

    cy.findByRole("region", { name: /labels/i })
      .as("projects")
      .within(() => {
        cy.findByRole("link", { name: "First label" }).as("firstLabelLink");
        cy.findByRole("link", { name: "Second label" });
      });

    cy.get("@favorites").within(() =>
      cy.findByRole("link", { name: "First label" }),
    );

    // Clicking item links and checking if the url matches
    cy.get("@firstProjectLink").click();
    cy.findByRole("heading", { name: "First project" });
    cy.get("@firstProjectLink").then(($el) => {
      const href = $el.prop("href");
      cy.url().should("include", href);
    });

    cy.get("@firstLabelLink").click();
    cy.findByRole("heading", { name: "First label" });
    cy.get("@firstLabelLink").then(($el) => {
      const href = $el.prop("href");

      cy.url().should("include", href);
    });

    cy.findByRole("button", { name: /go to home/i })
      .as("goHomeButton")
      .click();

    // Checking if we can get to item pages through the search
    cy.findByRole("search").as("search").focus().type("First pr");

    cy.findByRole("listbox", { name: /search results/i })
      .as("searchResults")
      .within(() => cy.findByRole("link", { name: "First project" }).click());
    cy.findByRole("heading", { name: "First project" });

    cy.get("@search").click().type("{selectAll}First la");

    cy.get("@searchResults").within(() =>
      cy.findByRole("link", { name: "First label" }).click(),
    );
    cy.findByRole("heading", { name: "First label" });

    // Theme changing
    cy.findByRole("button", { name: /change the theme/i }).click({
      force: true,
    });
    cy.findByRole("radio", { name: /orange/i }).click();
    cy.findByRole("radio", { name: /noir/i }).click();
    cy.findByRole("button", { name: /^close$/i }).click();

    // Logout
    cy.findByRole("button", { name: /logout/i }).click();
    cy.findByRole("button", { name: /ok/i }).click();

    cy.findByRole("button", { name: /sign in/i });
  });
});

export {};
