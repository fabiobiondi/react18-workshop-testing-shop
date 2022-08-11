// const API = Cypress.env('REACT_APP_BASE_API');
import "cypress-localstorage-commands";

import { ordersMock } from "../mocks/orders-mock";

describe("Admin: Order Page", () => {
  beforeEach(() => {
    // cy.restoreLocalStorage();

    // Mock Login
    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/660/orders`,
      { method: "GET" },
      ordersMock
    );

    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/login`,
      { method: "POST" },
      { accessToken: 123, user: { email: "xyz@abc.com", id: 1 } }
    );

    // cy.intercept(`${API}/users`, {method: 'GET'}, mockData)
    cy.visit(`${Cypress.env("REACT_APP_URL")}/admin`);

    cy.get('input[name="username"]').clear();
    cy.get('input[name="password"]').clear();
    cy.get('input[name="username"]').type("mario@rossi.it");
    cy.get('input[name="password"]').type("123456");
    cy.get("button").contains("Sign In").click();

    cy.get('[data-testid="order-list"]').as("list");
  });

  afterEach(() => {
    // cy.saveLocalStorage();
  });

  it(`should display ${ordersMock.length} orders in the list`, () => {
    cy.get("@list").children().should("have.length", ordersMock.length);
  });

  // useless because of next text in which we iterate on all list elements
  it(`should properly display data on first element`, () => {
    cy.get("@list").first().contains(ordersMock[0].client.first_name);

    cy.get("@list").first().contains(ordersMock[0].totalCost);

    cy.get("@list").first().contains(ordersMock[0].status);
  });

  it(`should properly display data on each element`, () => {
    cy.get("@list")
      .children()
      .each(($el, index, $list) => {
        cy.wrap($el).contains(ordersMock[index].client.first_name);
        cy.wrap($el).contains(ordersMock[index].totalCost);
        cy.wrap($el).contains(ordersMock[index].status);
      });
  });

  it(`should toggle status`, () => {
    // Mock Login
    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/660/orders/${ordersMock[0].id}`,
      { method: "PATCH" },
      {
        body: {
          ...ordersMock[0],
          status: ordersMock[0].status === "pending" ? "shipped" : "pending",
        },
      }
    );

    // click on Actions button
    cy.get("@list").first().contains("Actions").click();

    // click on Toggle Status button
    cy.get("@list").first().contains("Toggle").click();
  });
});
