/// <reference types="cypress" />

// TODO
import { ordersListMock } from "../mocks/orders-mock";

describe("Login", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("REACT_APP_URL")}/login`);
    cy.get('input[name="username"]').clear();
    cy.get('input[name="password"]').clear();
    cy.get("button").contains("Sign In").as("btn");
  });

  it('should automatically disable the "SignIn" button when login is visited first time', () => {
    cy.get("@btn").should("be.disabled");
  });

  it('should enable the "SignIn Button" when form is valid', () => {
    cy.get('input[name="username"]').type("mario@rossi.it");
    cy.get('input[name="password"]').type("123456");
    cy.get("@btn").should("be.enabled");
  });

  it('should disable the "SignIn Button" when form is invalid', () => {
    cy.get('input[name="username"]').type("ma");
    cy.get('input[name="password"]').type("12");
    cy.get("@btn").should("be.disabled");
  });

  it("should return error if Login response fails", () => {
    cy.intercept("POST", "/users*", {
      statusCode: 400,
      body: "some errors",
    });

    cy.get('input[name="username"]').type("fakeuser@doesnotexist.it");
    cy.get('input[name="password"]').type("123456");
    cy.get("@btn").click();

    // display the global error msg
    cy.get('[data-testid="global-error-msg"]').should("exist");
  });

  // This test is equal to the previous but we use a reusable command to login
  it("should return error if Login response fails (example with command", () => {
    cy.intercept("POST", "/users*", { statusCode: 400, body: "some errors" });
    cy.login("mario", "12345"); // NEW WAY: LOGIN using COMMANDs
    cy.get('[data-testid="global-error-msg"]').should("exist");
  });

  it('should redirect to "admin" page when sign in button is clicked', () => {
    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/login`,
      { method: "POST" },
      { accessToken: 123, user: { email: "xyz@abc.com", id: 1 } }
    );
    // mock orders API to avoid redirects to login or errors when an API fails
    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/660/orders`,
      { method: "GET" },
      ordersListMock
    );

    cy.login("mario", "12345");

    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/admin");
    });
  });

  it('should redirect to "login" if I visit the admin page first time', () => {
    cy.visit(`${Cypress.env("REACT_APP_URL")}/admin`);

    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/login");
    });
  });

  it('should redirect to "login" if I click the admin navigation button', () => {
    // click the Admin button in Navbar
    cy.get('[data-testid="navbar"]').within(() => {
      // Why force: true is necessary?
      // https://docs.cypress.io/guides/references/error-messages#cy-failed-because-the-element-cannot-be-interacted-with
      // See NavBar.tsx that has an hidden cls:  <div className="hidden ml-10 space-x-8 lg:block">
      //                                            {navigation.map((link) => (
      cy.contains("Admin").click({ force: true });
    });

    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/login");
    });
  });

  it.only('should redirect to "admin" if I visit the admin page after user is already logged', () => {
    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/login`,
      { method: "POST" },
      { accessToken: 123, user: { email: "xyz@abc.com", id: 1 } }
    );
    // mock orders API to avoid redirects to login or errors when an API fails
    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/660/orders`,
      { method: "GET" },
      ordersListMock
    );

    /**
     * FirstTime: go to "admin" page
     * NOTE: first time it should be redirected to the 'login' page
     */
    cy.visit(`${Cypress.env("REACT_APP_URL")}/admin`);
    // we can check if we'are in the login page
    // Anyway, this check is not really necessary since the next step if the Login Command
    // and it would fails if I'm not in the login page
    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/login");
    });
    // in fact, we try to login
    cy.login("mario", "12345");

    // Since next command redirect to home, and this load some images, we need to mock them to avoid network requests
    cy.intercept("https://images.unsplash.com/**/*.*", {
      fixture: "image2_placeholder.png",
    });
    cy.intercept(`/**/*.gif`, { fixture: "image2_placeholder.png" });
    // go to another page (whatever)
    cy.visit(`${Cypress.env("REACT_APP_URL")}/home`);

    /**
     * Second Time: visit again the "admin" page again that
     * NOTE: NOW it should be 'admin'
     * WHY? a route guard check if user is already logged (in localstorage)
     */
    cy.visit(`${Cypress.env("REACT_APP_URL")}/admin`);
    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/admin");
    });
  });
});
