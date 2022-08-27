import { mockProducts } from "../../../mocks";
import { productsMock } from "../mocks/products-mock";
const firstProduct = productsMock[0];

/*import { slowCypressDown } from 'cypress-slow-down';
slowCypressDown(300)*/

describe("Cart Summary", () => {
  /**
   * Select size, color and click to "add to bag" button
   */
  beforeEach(() => {
    // Mock Products request and provide mock data
    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/products/1`,
      { method: "GET" },
      firstProduct
    );
    // Visit shop page
    cy.visit(`${Cypress.env("REACT_APP_URL")}/shop/1`);

    // select first color
    cy.get('[data-testid="colors"]')
      .children()
      .find(`[style="background-color: ${firstProduct.colors[0]};"]`)
      .first()
      .click();

    // select first size
    cy.get('[data-testid="sizes"]')
      .children()
      .contains(firstProduct.sizes[0])
      .first()
      .click();

    // click "add to cart" button
    cy.get("button").contains("Add to bag").click();
    // reference to the cart summary panel
    cy.get('[data-testid="cart-summary"]').as("summary");
  });

  it(`should display the item added to cart`, () => {
    // within: checks only inside the specified container
    cy.get("@summary").within(() => {
      cy.contains(firstProduct.name);
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

  it(`should remove the element clicking the 'remove' button`, () => {
    cy.get("@summary").within(() => {
      cy.contains("Remove").click();
      cy.contains(firstProduct.name).should("not.exist");
    });
  });

  it(`should enable the checkout button if cart has at least one element`, () => {
    cy.get("@summary").within(() => {
      cy.contains("Checkout").should("be.enabled");
    });
  });

  it(`should disable the checkout button if cart is empty`, () => {
    cy.get("@summary").within(() => {
      cy.contains("Remove").click();
      cy.contains("Checkout").should("be.disabled");
    });
  });

  it(`should redirect to the checkout page when the 'checkout' button is clicked`, () => {
    cy.get("@summary").within(() => {
      cy.contains("Checkout").click();
    });

    cy.location().should((location) => {
      expect(location.pathname).to.eq(`/checkout`);
    });
  });
});
