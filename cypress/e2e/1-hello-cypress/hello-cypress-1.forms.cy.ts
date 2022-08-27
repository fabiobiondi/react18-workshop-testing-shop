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
    cy.get("button").contains("submit", { matchCase: false }).as("formBtn");
  });

  it("button should disabled if form is invalid", () => {
    cy.get("@formBtn").should("be.disabled");
  });

  it("button should enable if form is valid", () => {
    cy.visit(`${Cypress.env("REACT_APP_URL")}/hello-cypress`);
    cy.get('input[name="first_name"]').clear();
    cy.get('input[name="first_name"]').type("Mario Rossi");
    cy.get("@formBtn").should("be.enabled");
  });

  it("button should enable if form is valid", () => {
    const formData = { firstName: "Mario RossiX" };

    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/fakeForm`,
      { method: "POST" },
      {
        statusCode: 200,
        body: {
          id: Date.now(), // fake ID
          ...formData,
        },
      }
    ).as("formRequest");

    cy.get('input[name="first_name"]').type(formData.firstName);
    cy.get("@formBtn").click();

    cy.wait("@formRequest").then((xhr) => {
      expect(xhr.request.method).to.eq("POST");
      // check if the response contains the first name
      expect(xhr.response.body).to.contains(formData);
      // NOTE: if the response should match you can use the following syntax
      // expect(xhr.response.body).deep.equals(formData);
    });
  });
});
