import { mockProducts } from "../../../mocks";
import { productsMock } from "../mocks/products-mock";

// import { slowCypressDown } from 'cypress-slow-down';
// slowCypressDown(1000)
const firstProduct = productsMock[0];
const lastProduct = productsMock[productsMock.length - 1];

describe("Shop Page", () => {
  beforeEach(() => {
    // Mock Products request and provide mock data
    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/products`,
      { method: "GET" },
      productsMock
    );

    // Mock Images
    cy.intercept(`/**/*.png`, { fixture: "image2_placeholder.png" });
    cy.intercept(`/**/*.jpg`, { fixture: "image2_placeholder.png" });

    // Visit shop page
    cy.visit(`${Cypress.env("REACT_APP_URL")}/shop`);

    // set product list alias
    cy.get('[data-testid="products-list"]').as("productList");
  });

  it(`should display exactly ${productsMock.length} elements in the page`, () => {
    cy.get("@productList")
      .children()
      .should("have.length", productsMock.length);
  });

  it(`should the first item display its own name and price`, () => {
    cy.get("@productList").children().first().contains(firstProduct.name);
    cy.get("@productList").children().first().contains(firstProduct.price);
  });

  it(`should the last item display its own name and price`, () => {
    cy.get("@productList").children().last().contains(lastProduct.name);
    cy.get("@productList").children().last().contains(lastProduct.price);
  });

  it(`should first and last items contains at least one image (the first)`, () => {
    cy.get("@productList")
      .children()
      .first()
      .find("img")
      .should("have.attr", "src")
      .should("include", firstProduct.images[0]);

    cy.get("@productList")
      .children()
      .last()
      .find("img")
      .should("have.attr", "src")
      .should("include", lastProduct.images[0]);
  });

  /**
   * This test check if the first and last product panel display the list of color
   * NOTE: See next test for a better solution to test all products
   */
  it(`should first and last product display the color list`, () => {
    mockProducts.forEach((p, index) => {
      cy.get("@productList")
        .children()
        .first()
        .find(`[style="background-color: ${firstProduct.colors[index]};"]`);

      cy.get("@productList")
        .children()
        .last()
        .find(`[style="background-color: ${lastProduct.colors[index]};"]`);
    });
    // NOTE: THIS DOES NOT WORK
    // .should('have.css', 'background-color', productsMock[productsMock.length-1].colors[0])
  });

  /**
   * This is a better approach to the previous test
   * This check all the children of the list
   * and for its child it check if it displays all the available colors
   */
  it(`should first and last product display at least a list`, () => {
    cy.get("@productList").each(($el, index) => {
      mockProducts.forEach((p, index) => {
        cy.wrap($el).find(`[style="background-color: ${p.colors[index]};"]`);
      });
    });
  });

  it(`should redirect to product page when an item is clicked`, () => {
    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/products/${firstProduct.id}`,
      { method: "GET" },
      firstProduct
    );

    // click the item
    cy.get("@productList").children().first().click();

    // check if the route changes
    cy.location().should((location) => {
      expect(location.pathname).to.eq(`/shop/${firstProduct.id}`);
    });
  });
});
