describe("My First Test", () => {
  it("Visits the Hello Cypress page", () => {
    cy.visit("http://localhost:3000/hello-cypress");
    cy.contains("Hello Cypress");
    cy.get('input[name="hello"]').type("http://localhost:3000{enter}");
    cy.url().should("include", "/localhost:3000");
    cy.contains("React 18");
  });
});
