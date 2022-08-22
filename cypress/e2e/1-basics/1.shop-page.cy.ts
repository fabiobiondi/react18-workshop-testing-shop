import { mockProducts } from "../../../mocks";
import { productsMock } from "../mocks/products-mock";

// import { slowCypressDown } from 'cypress-slow-down';
// slowCypressDown(1000)

describe("Shop Page", () => {
  let list;

  beforeEach(() => {
    // Mock Products request and provide mock data
    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/products`,
      { method: "GET" },
      productsMock
    );

    // Mock Images
    cy.intercept(`/**/*.png`, { fixture: "image1_placeholder.jpg" });
    cy.intercept(`/**/*.jpg`, { fixture: "image1_placeholder.jpg" });

    // Visit shop page
    cy.visit(`${Cypress.env("REACT_APP_URL")}/shop`);
    // get list reference
    list = cy.get('[data-testid="products-list"]');
  });

  it(`should display exactly ${productsMock.length} elements in the page`, () => {
    list.children().should("have.length", productsMock.length);
  });

  it(`should the first item display its own name and price`, () => {
    list.children().first().contains(productsMock[0].name);

    list.children().first().contains(productsMock[0].price);
  });

  it(`should the last item display its own name and price`, () => {
    list
      .children()
      .last()
      .contains(productsMock[productsMock.length - 1].name);

    list
      .children()
      .last()
      .contains(productsMock[productsMock.length - 1].price);
  });

  it(`should items contains the first image product`, () => {
    list
      .children()
      .first()
      .find("img")
      .should("have.attr", "src")
      .should("include", productsMock[0].images[0]);

    list
      .children()
      .last()
      .find("img")
      .should("have.attr", "src")
      .should("include", productsMock[productsMock.length - 1].images[0]);
  });

  it(`should items display colors`, () => {
    list
      .children()
      .first()
      .find(`[style="background-color: ${productsMock[0].colors[0]};"]`);

    list
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
    list.children().first().click();

    cy.location().should(location => {
      expect(location.pathname).to.eq(`/shop/${mockProducts[0].id}`);
    });
  });
});