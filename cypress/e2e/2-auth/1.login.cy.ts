/// <reference types="cypress" />

// TODO

import { ordersMock } from "../mocks/orders-mock";

describe("Login", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("REACT_APP_URL")}/login`);
    cy.get('input[name="username"]').clear();
    cy.get('input[name="password"]').clear();

    cy.get("button").contains("Sign In").as("btn");
  });

  it("login button is disabled when form is invalid", () => {
    cy.get("@btn").should("be.disabled");
  });

  it("login button is enabled when form is valid", () => {
    cy.get('input[name="username"]').type("mario@rossi.it");
    cy.get('input[name="password"]').type("123456");
    cy.get("@btn").should("be.enabled");
  });

  it("login button is enabled when form is not valid", () => {
    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/login`,
      { method: "POST" },
      { accessToken: 123, user: { email: "xyz@abc.com", id: 1 } }
    );

    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/660/orders`,
      { method: "GET" },
      ordersMock
    );

    cy.get('input[name="username"]').type("mario@rossi.it");
    cy.get('input[name="password"]').type("123456");
    cy.get("@btn").click();
  });
});
