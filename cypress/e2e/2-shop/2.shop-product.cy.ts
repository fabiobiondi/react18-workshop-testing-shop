import { productsMock } from "../mocks/products-mock";

const firstProduct = productsMock[0];

/**
 * Example with nested and multiple describe blocks
 * It also show how nested beforeEach works
 */
describe("Shop Page", () => {
  /**
   * Mock XHR Products request and provide mock data
   * and go to a product page (id: 1)
   */
  beforeEach(() => {
    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/products/1`,
      { method: "GET" },
      productsMock[0]
    );
    // Visit shop page
    cy.visit(`${Cypress.env("REACT_APP_URL")}/shop/1`);
  });

  describe("default behaviors", () => {
    it(`should disabled the "add to bag" button before the selection of size and color`, () => {
      cy.get("button").contains("Add to bag").should("be.disabled");
    });

    it(`should disabled "add to bag" button if only color is selected`, () => {
      // it just test and click on the first color
      cy.get('[data-testid="colors"]')
        .children()
        .find(`[style="background-color: ${firstProduct.colors[0]};"]`)
        .first()
        .click();

      cy.get("button").contains("Add to bag").should("be.disabled");
    });
  });

  describe("Add to Cart", () => {
    beforeEach(() => {
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

      // click "Add to Cart" button
      cy.get("button").contains("Add to bag").click();
    });

    it(`should open the cart summary panel when an item is added to cart`, () => {
      cy.get('[data-testid="cart-summary"]').should("be.visible");
    });

    it(`should display the total of items added to cart in navbar`, () => {
      // check if the cart button display the number 1
      cy.get("div").contains("Cart (1)");
    });
  });
});
