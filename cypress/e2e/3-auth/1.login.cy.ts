/// <reference types="cypress" />
import { ordersListMock } from "../mocks/orders-mock";

/**
 * Work with login, forms and inteceptors
 * It also shows hot to use Cypress Env Variables
 * NOTE: some test uses a custom command "login"
 */
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
    cy.get('input[name="username"]').type("ma"); // not valid
    cy.get('input[name="password"]').type("12"); // not valid
    cy.get("@btn").should("be.disabled");
  });

  it("should display an error message if Login fails", () => {
    cy.intercept("POST", `${Cypress.env("REACT_APP_API_URL")}/login`, {
      statusCode: 400,
      body: "some errors!",
    });

    cy.get('input[name="username"]').type("fakeuser@doesnotexist.it");
    cy.get('input[name="password"]').type("123456");
    cy.get("@btn").click();

    // display the global error msg
    cy.get('[data-testid="global-error-msg"]').should("exist");
  });

  // This test is equal to the previous but we use a reusable command to login
  it("should return error if Login response fails (example with command", () => {
    cy.intercept("POST", `${Cypress.env("REACT_APP_API_URL")}/login`, {
      statusCode: 400,
      body: "some errors!!",
    });
    cy.login("mario", "12345"); // NEW WAY TO LOGIN: using a custom COMMAND
    cy.get('[data-testid="global-error-msg"]').should("exist");
  });

  /**
   * NOTE: User cannot visit the admin page if it's not logged!
   * This test visit the admin page before login, and he's automatically redirected to the login page
   * WHY? When user is logged, some info are saved on localstorage (by the application code),
   * and since the admin page has a guard to check if this info is available on localstorage
   * user cannot visit this page before sign-in
   */
  it('should redirect to "login" if I visit the admin page first time', () => {
    cy.visit(`${Cypress.env("REACT_APP_URL")}/admin`);

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/login");
    });
  });

  /**
   * This test intercepts the login and return success.
   * So, the user is redirected to the admin page
   */
  it('should redirect to "admin" page when sign in button is clicked', () => {
    // mock login API
    cy.intercept(
      `${Cypress.env("REACT_APP_API_URL")}/login`,
      // '/login',
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

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/admin");
    });
  });

  /**
   * This test does not sign-in the user.
   * So when the navbar 'Admin' button is clicked he's redirected to the login page
   */
  it('should redirect to "login" if I click the "admin" navigation button', () => {
    // click the Admin button in Navbar
    cy.get('[data-testid="navbar"]').within(() => {
      // Why force: true is necessary?
      // https://docs.cypress.io/guides/references/error-messages#cy-failed-because-the-element-cannot-be-interacted-with
      // See NavBar.tsx that has an hidden cls:  <div className="hidden ml-10 space-x-8 lg:block">
      //                                            {navigation.map((link) => (
      cy.contains("Admin").click({ force: true });
    });

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/login");
    });
  });

  /**
   * This test works because after login the token is saved on localstorage
   */
  it('should properly go to the "admin" page if I visit it when user is already logged', () => {
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

    // 1. GO TO ADMIN -> DENIED
    /**
     * FirstTime: go to "admin" page
     * NOTE: first time it should be redirected to the 'login' page
     */
    cy.visit(`${Cypress.env("REACT_APP_URL")}/admin`);
    // we can check if we'are in the login page
    // Anyway, this check is not really necessary since the next step if the Login Command
    // and it would fails if I'm not in the login page
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/login");
    });

    // 2. LOGIN
    cy.login("mario", "12345");
    // --------------

    // 3. CHANGE PAGE: GO TO HOME
    // Since next command redirect to home, and this load some images, we need to mock them to avoid network requests
    cy.intercept("https://images.unsplash.com/**/*.*", {
      fixture: "image2_placeholder.png",
    });
    // mock images
    cy.intercept(`/**/*.gif`, { fixture: "image2_placeholder.png" });
    // go to another page (whatever)
    cy.visit(`${Cypress.env("REACT_APP_URL")}/home`);

    // 4. BACK TO ADMIN
    /**
     * Second Time: visit again the "admin" page again that
     * NOTE: NOW it should be 'admin'
     * WHY? a route guard check if user is already logged (in localstorage)
     */

    // go to admin again
    cy.visit(`${Cypress.env("REACT_APP_URL")}/admin`);
    // check if it works
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/admin");
    });
  });
});
