// const API = Cypress.env('REACT_APP_BASE_API');
import "cypress-localstorage-commands";

import { ordersListMock } from "../mocks/orders-mock";
const firstOrder = ordersListMock[0];

describe("Admin: Order Page", () => {
  beforeEach(() => {
    // cy.restoreLocalStorage();

    // Mock Orders
    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/660/orders`,
      { method: "GET" },
      ordersListMock
    );

    // Mock Login
    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/login`,
      { method: "POST" },
      { accessToken: 123, user: { email: "xyz@abc.com", id: 1 } }
    );

    // LOGIN
    cy.visit(`${Cypress.env("REACT_APP_URL")}/login`);
    cy.login("Fabio_Biondi", 1234);
    // Reference to the order list
    cy.get('[data-testid="order-list"]').as("list");
  });

  afterEach(() => {
    // cy.saveLocalStorage();
  });

  it(`should display ${ordersListMock.length} orders in the list`, () => {
    cy.get("@list").children().should("have.length", ordersListMock.length);
  });

  /**
   * Check if the first item of the list contains some product data
   * NOTE: this test useless because of next test in which we iterate on all list elements
   */
  it(`should properly display product data on first element`, () => {
    cy.get("@list").first().contains(firstOrder.client.first_name);
    cy.get("@list").first().contains(firstOrder.totalCost);
    cy.get("@list").first().contains(firstOrder.status);
  });

  /**
   * Better alternative to the previous test
   * It checks all products
   */
  it(`should properly display product data on each element`, () => {
    cy.get("@list")
      .children()
      .each(($el, index, $list) => {
        cy.wrap($el).contains(ordersListMock[index].client.first_name);
        cy.wrap($el).contains(ordersListMock[index].totalCost);
        cy.wrap($el).contains(ordersListMock[index].status);
        cy.wrap($el).contains(ordersListMock[index].totalCost);
      });
  });

  it.only(`should toggle the order status`, () => {
    // Mock Login
    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/660/orders/${firstOrder.id}`,
      { method: "PATCH" },
      {
        body: {
          ...firstOrder,
          status: firstOrder.status === "pending" ? "shipped" : "pending",
        },
      }
    );

    // check if status is 'pending'
    cy.get("@list").first().contains("pending");

    // click on Actions dropdown
    cy.get("@list").first().contains("Actions").click();
    // click on Toggle Status button
    cy.get("@list").first().contains("Toggle").click();

    // click if status has been toggled to 'shipped'
    cy.get("@list").first().contains("shipped");
  });
});
