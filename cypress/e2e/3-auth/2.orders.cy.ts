
// const API = Cypress.env('REACT_APP_BASE_API');
import "cypress-localstorage-commands";

import { ordersListMock } from "../mocks/orders-mock";

describe("Admin: Order Page", () => {
  beforeEach(() => {
    // cy.restoreLocalStorage();

    // Mock Login
    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/660/orders`,
      { method: "GET" },
      ordersListMock
    );

    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/login`,
      { method: "POST" },
      { accessToken: 123, user: { email: "xyz@abc.com", id: 1 } }
    );

    // cy.intercept(`${API}/users`, {method: 'GET'}, mockData)
    cy.visit(`${Cypress.env("REACT_APP_URL")}/login`);
    cy.login("Fabio_Biondi", 1234);
    cy.get('[data-testid="order-list"]').as("list");
  });

  afterEach(() => {
    // cy.saveLocalStorage();
  });

  it(`should display ${ordersListMock.length} orders in the list`, () => {
    cy.get("@list").children().should("have.length", ordersListMock.length);
  });

  // useless because of next text in which we iterate on all list elements
  it(`should properly display data on first element`, () => {
    cy.get("@list").first().contains(ordersListMock[0].client.first_name);

    cy.get("@list").first().contains(ordersListMock[0].totalCost);

    cy.get("@list").first().contains(ordersListMock[0].status);
  });

  it(`should properly display data on each element`, () => {
    cy.get("@list")
      .children()
      .each(($el, index, $list) => {
        cy.wrap($el).contains(ordersListMock[index].client.first_name);
        cy.wrap($el).contains(ordersListMock[index].totalCost);
        cy.wrap($el).contains(ordersListMock[index].status);
      });
  });

  it(`should toggle status`, () => {
    // Mock Login
    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/660/orders/${ordersListMock[0].id}`,
      { method: "PATCH" },
      {
        body: {
          ...ordersListMock[0],
          status:
            ordersListMock[0].status === "pending" ? "shipped" : "pending",
        },
      }
    );

    // click on Actions button
    cy.get("@list").first().contains("Actions").click();

    // click on Toggle Status button
    cy.get("@list").first().contains("Toggle").click();
  });
});
