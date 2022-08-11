/// <reference types="cypress" />

const API = Cypress.env("REACT_APP_BASE_API");

describe("Cities Page", () => {
  beforeEach(() => {
    // Mock Login
    cy.intercept(`${API}/login`, { method: "GET" }, { accessToken: 123 });

    // Do login
    cy.login("Fabio", "Biondi");

    // Mock Cities request and provide mock data
    cy.intercept(`${API}/cities?q=`, { method: "GET" }, [
      { id: 1, city: "Milano" },
      { id: 2, city: "Roma" },
    ]);

    // Go to Cities Route
    cy.visit(`${Cypress.env("REACT_APP_URL")}/cities`);
  });

  it("after login, go to cities", () => {
    cy.location().should((location) => {
      console.log("QUI", location.pathname);
      expect(location.pathname).to.eq("/cities");
    });
  });

  it.only("edit a city", () => {
    const currentCity = { id: 1, city: "Milano" };
    const newCityName = "Trieste";

    cy.intercept(
      `${API}/cities/${currentCity.id}`,
      { method: "PATCH" },
      { ...currentCity, city: newCityName }
    );

    // MouseOver the CARET icon into the panel city panel we have just created
    cy.contains(currentCity.city)
      .parent()
      .within(() => {
        cy.get("svg").trigger("mouseover");
      });

    cy.contains("Edit").click();

    cy.get('div[role="dialog"]').within(() => {
      cy.get('input[placeholder="edit city"]').clear();
      cy.get('input[placeholder="edit city"]').type(newCityName);
      cy.contains("OK").click();
    });
  });

  it("add and remove a city", () => {
    const cityToAdd = {
      city: "Palermo",
      id: 123,
    };
    cy.intercept(`${API}/cities`, { method: "POST" }, cityToAdd);

    // ADD CITY
    // open ADD Modal
    cy.get('span[title="add city"]').click();
    // Write a text
    cy.get('input[placeholder="add city"]').type(cityToAdd.city);
    // Confirm
    cy.get('div[role="dialog"]').within(() => {
      cy.contains("OK").click();
    });

    // REMOVE CITY
    cy.intercept(`${API}/cities/${cityToAdd.id}`, { method: "DELETE" }, {});

    // MouseOver the CARET icon into the panel city panel we have just created
    cy.contains(cityToAdd.city)
      .parent()
      .within(() => {
        cy.get("svg").trigger("mouseover");
      });

    // click on delete and confirm
    cy.contains("Delete").click();
    cy.contains("OK").click();
  });

  it("search a city", () => {
    // TODO MOCK DATA

    // Get Input Search
    const input = 'input[placeholder="Search City"]';
    cy.get(input).clear();

    // SEARCH 1: Rome
    const city1 = "Roma";
    cy.intercept(`${API}/cities?q=${city1}`, { method: "GET" }, [
      { city: city1, id: 2 },
    ]);

    cy.get(input).type(city1);
    cy.contains(city1);
    // Check if there is a static map with Roma
    cy.get("img").should("have.attr", "src").should("include", city1);

    // SEARCH 2: Milano
    const city2 = "Milano";
    cy.intercept(`${API}/cities?q=${city2}`, { method: "GET" }, [
      { city: city2, id: 1 },
    ]);

    cy.get(input).clear();
    cy.get(input).type(city2);
    // Check if there is a static map with Milano
    cy.get("img").should("have.attr", "src").should("include", city2);
  });
});
