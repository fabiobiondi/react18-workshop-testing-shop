/// <reference types="cypress" />

// TODO

import { BASE_API } from "../../../src/core/config";
import { ordersMock } from "../mocks/orders-mock";

describe.skip("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
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
      `${BASE_API}/login`,
      { method: "POST" },
      { accessToken: 123, user: { email: "xyz@abc.com", id: 1 } }
    );

    cy.intercept(`${BASE_API}/660/orders`, { method: "GET" }, ordersMock);

    cy.get('input[name="username"]').type("mario@rossi.it");
    cy.get('input[name="password"]').type("123456");
    cy.get("@btn").click();
  });
});
