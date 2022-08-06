/// <reference types="cypress" />

describe("Login Mock", () => {
  it("after login, go to homepage", () => {
    cy.intercept(
      "http://localhost:3001/login",
      { method: "GET" },
      { accessToken: 123 }
    );

    cy.login("Fabio", "Biondi");

    cy.location().should((location) => {
      expect(location.pathname).to.eq("/homepage");
    });
  });

  it("after login, save token in localstorage", () => {
    cy.intercept(
      "http://localhost:3001/login",
      { method: "GET" },
      { accessToken: 123 }
    );

    cy.login("Fabio", "Biondi").should(() => {
      expect(localStorage.getItem("token")).to.eq("123");
    });
  });

  /*
  // Problem with antD:  "Maximum update depth exceeded. This can happen when a component repeatedly calls setState"
  it.only('after logout, localstorage is removed', () => {
    cy.login('Fabio', 'Biondi')
    cy.get('[data-cy="logout"]').click()
  })
  */

  it("after login success should not display an error message", () => {
    cy.intercept(
      "http://localhost:3001/login",
      { method: "GET" },
      { accessToken: 123 }
    );
    cy.login("Fabio", "Biondi");
    cy.get('[data-testid="error-msg"]').should("not.exist");
  });

  it("when login error display a message", () => {
    cy.intercept("GET", "http://localhost:3001/login", {
      statusCode: 404,
      body: { error: "ahia!" },
    }).as("end");

    cy.login("Fabio", "Biondi");

    cy.get('[data-testid="error-msg"]').should("be.visible");
  });
});
