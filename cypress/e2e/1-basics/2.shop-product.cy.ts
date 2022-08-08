import { APP_CONFIG } from "../../../src/core/config";
import { productsMock } from "../mocks/products-mock";

describe("Shop Page: default behaviors", () => {
  beforeEach(() => {
    // Mock Products request and provide mock data
    cy.intercept(
      `${APP_CONFIG.baseApiUrl}/products/1`,
      { method: "GET" },
      productsMock[0]
    );
    // Visit shop page
    cy.visit("http://localhost:3000/shop/1");
  });

  it(`should disabled "add to bag" button before the selection of size and color`, () => {
    cy.get("button").contains("Add to bag").should("be.disabled");
  });

  it(`should disabled "add to bag" button if only color is selected`, () => {
    cy.get('[data-testid="colors"]')
      .children()
      .find(`[style="background-color: ${productsMock[0].colors[0]};"]`)
      .first()
      .click();

    cy.get("button").contains("Add to bag").should("be.disabled");
  });
});

describe("Shop Page: Add to Cart", () => {
  beforeEach(() => {
    // Mock Products request and provide mock data
    cy.intercept(
      `${APP_CONFIG.baseApiUrl}/products/1`,
      { method: "GET" },
      productsMock[0]
    );
    // Visit shop page
    cy.visit("http://localhost:3000/shop/1");

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
  });

  it(`should display the total of items added to cart in navbar`, () => {
    // check if the cart button display 1 product
    cy.get("div").contains("Cart (1)");
  });

  it(`should display the cart summary when an item is added to cart`, () => {
    // check if the cart button display 1 product
    cy.get('[data-testid="cart-summary"]').should("be.visible");
  });
});
