import { mockList } from "../mocks/hello-mocks";

describe("Hello Cypress", () => {
  beforeEach(() => {
    // Mock List
    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/fakeList`,
      { method: "GET" },
      mockList
    );

    // Mock Image
    cy.intercept(
      {
        method: "GET",
        url: /\/.+\.(png|svg|jpeg|webp|jpg)/, // add the regex directly
      },
      { fixture: "image2_placeholder.png" }
    );

    // cy.intercept(`/**/*.png`, { fixture: "image2_placeholder.png" });

    cy.visit(`${Cypress.env("REACT_APP_URL")}/hello-cypress`);
    cy.get('[data-testid="list1"]').as("list1");
  });

  it(`should display exactly ${mockList.length} elements in the page`, () => {
    cy.get("@list1").children().should("have.length", mockList.length);
  });

  it(`should the first and last item display its own name and price`, () => {
    const firstProduct = mockList[0];
    cy.get("@list1").children().first().contains(firstProduct.name);
    cy.get("@list1").children().first().contains(firstProduct.cost);

    const lastProduct = mockList[mockList.length - 1];
    cy.get("@list1").children().last().contains(lastProduct.name);
    cy.get("@list1").children().last().contains(lastProduct.cost);
  });

  it(`should all items display its own name and price`, () => {
    cy.get("@list1").each(($el, index) => {
      mockList.forEach((p, index) => {
        cy.wrap($el).contains(p.name);
        cy.wrap($el).contains(p.cost);
      });
    });
  });
});

describe("Error Handling", () => {
  it(`should display a message if list is not loaded`, () => {
    // Mock List with errors
    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/fakeList`,
      { method: "GET" },
      {
        statusCode: 404,
        body: "some errors here!",
      }
    );

    cy.visit(`${Cypress.env("REACT_APP_URL")}/hello-cypress`);
    cy.get('[data-testid="list1"]').as("list1");

    cy.get("@list1").contains("list not loaded");
  });

  it(`should delete an item`, () => {
    const firstProduct = mockList[0];
    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/fakeList`,
      { method: "GET" },
      mockList
    );

    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/fakeList/${firstProduct.id}`,
      { method: "DELETE" },
      {
        statusCode: 404,
        body: "some errors here!",
      }
    ).as("formRequest");

    cy.visit(`${Cypress.env("REACT_APP_URL")}/hello-cypress`);
    cy.get('[data-testid="list1"]').as("list1");

    cy.get("@list1").children().first().contains("Delete").click();
  });
});
