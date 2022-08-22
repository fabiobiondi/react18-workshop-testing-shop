import { mockProducts } from "../../../mocks";
import { productsMock } from "../mocks/products-mock";

/*import { slowCypressDown } from 'cypress-slow-down';
slowCypressDown(300)*/

describe("Cart Summary", () => {
  beforeEach(() => {
    // Mock Products request and provide mock data
    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/products/1`,
      { method: "GET" },
      productsMock[0]
    );
    // Visit shop page
    cy.visit(`${Cypress.env("REACT_APP_URL")}/shop/1`);

    // select first color
    cy.get('[data-testid="colors"]')
      .children()
      .find(`[style="background-color: ${productsMock[0].colors[0]};"]`)
      .first()
      .click();

    // select first size
    cy.get('[data-testid="sizes"]')
      .children()
      .contains(productsMock[0].sizes[0])
      .first()
      .click();

    // click
    cy.get("button").contains("Add to bag").click();

    cy.get('[data-testid="cart-summary"]').as("summary");
  });

  it(`should contains the item added to cart`, () => {
    cy.get("@summary").within(() => {
      cy.contains(mockProducts[0].name);
    });
  });

  it(`should increment the qty`, () => {
    cy.get("@summary").within(() => {
      cy.contains("+").click();
      cy.contains("+").click();
      cy.contains("Qty 3");
    });
  });

  it(`should decrement and never become less than 1`, () => {
    cy.get("@summary").within(() => {
      cy.contains("+").click();
      // decrement twice
      cy.contains("-").click();
      cy.contains("-").click();
      cy.contains("Qty 1");
    });
  });

  it(`should remove the element`, () => {
    cy.get("@summary").within(() => {
      cy.contains("Remove").click();
      cy.contains(mockProducts[0].name).should("not.exist");
    });
  });

  it(`should disable the checkout button if cart is empty`, () => {
    cy.get("@summary").within(() => {
      cy.contains("Remove").click();
      cy.contains("Checkout").should("be.disabled");
    });
  });

  it(`should enable the checkout button if cart has at least one element`, () => {
    cy.get("@summary").within(() => {
      cy.contains("Checkout").should("be.enabled");
    });
  });

  it(`should go to the checkout page when button is clicked`, () => {
    cy.get("@summary").within(() => {
      cy.contains("Checkout").click();
    });

    cy.location().should(location => {
      expect(location.pathname).to.eq(`/checkout`);
    });
  });
});