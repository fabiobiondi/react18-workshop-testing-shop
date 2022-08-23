import { mockProducts } from "../../../mocks";
import { productsMock } from "../mocks/products-mock";

// import { slowCypressDown } from 'cypress-slow-down';
// slowCypressDown(1000)

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
    cy.get("@productList").children().first().contains(productsMock[0].name);

    cy.get("@productList").children().first().contains(productsMock[0].price);
  });

  it(`should the last item display its own name and price`, () => {
    const lastProduct = productsMock[productsMock.length - 1];
    cy.get("@productList").children().last().contains(lastProduct.name);

    cy.get("@productList").children().last().contains(lastProduct.price);
  });

  it(`should items contains the first product image`, () => {
    cy.get("@productList")
      .children()
      .first()
      .find("img")
      .should("have.attr", "src")
      .should("include", productsMock[0].images[0]);

    cy.get("@productList")
      .children()
      .last()
      .find("img")
      .should("have.attr", "src")
      .should("include", productsMock[productsMock.length - 1].images[0]);
  });

  it(`should items display colors`, () => {
    cy.get("@productList")
      .children()
      .first()
      .find(`[style="background-color: ${productsMock[0].colors[0]};"]`);

    cy.get("@productList")
      .children()
      .last()
      .find(
        `[style="background-color: ${
          productsMock[productsMock.length - 1].colors[0]
        };"]`
      );
    // NOT WORK
    // .should('have.css', 'background-color', productsMock[productsMock.length-1].colors[0])
  });

  it(`should redirect to product page when an item is clicked`, () => {
    cy.get("@productList").children().first().click();

    cy.location().should(location => {
      expect(location.pathname).to.eq(`/shop/${mockProducts[0].id}`);
    });
  });
});
