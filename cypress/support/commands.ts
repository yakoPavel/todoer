// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "@testing-library/cypress/add-commands";

Cypress.Commands.add("login", () => {
  cy.fixture("userCredentials").then(({ email, password }) => {
    cy.findByRole("textbox", { name: /email/i }).type(email);
    cy.get("#password").type(password);
    cy.findByRole("button", { name: /sign in/i }).click();
  });
});

Cypress.Commands.add(
  "createItem",
  ({ type, name, color = "Berry Red", isFavorite = false }) => {
    cy.findByRole("button", { name: RegExp(`add new ${type}`, "i") }).click();

    cy.findByRole("textbox", { name: /name/i }).type(name);

    cy.findByTestId("colorInput").click();
    cy.findByRole("listbox", { name: /color/i })
      .findByRole("option", { name: RegExp(color, "i") })
      .click();

    if (isFavorite) {
      cy.findByRole("checkbox", { name: /add to favorites/i }).check({
        force: true,
      });
    }

    cy.findByRole("button", { name: /submit/i }).click();
  },
);

Cypress.Commands.add("toggleSideMenuSection", (name) => {
  cy.findByTestId("sideMenuContent")
    .findByRole("button", { name: RegExp(`^${name}$`, "i") })
    .as(`${name} button`)
    .click();
});
