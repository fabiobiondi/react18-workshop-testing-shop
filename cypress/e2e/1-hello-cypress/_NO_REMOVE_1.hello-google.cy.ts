describe.skip("Google Search", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /\/.+\.(png|svg|jpeg|jpg|webp|jpg)/, // add the regex directly
      },
      { fixture: "image2_placeholder.png" }
    );
    cy.intercept("/_next/image**", { fixture: "image2_placeholder.png" });
    cy.intercept("/images/**/*.*", { fixture: "image2_placeholder.png" });
    cy.intercept(`/**/*.webp`, { fixture: "image2_placeholder.png" });
    cy.intercept(`/**/*.svg`, { fixture: "image2_placeholder.png" });
    cy.intercept(`/**/*.jpg`, { fixture: "image2_placeholder.png" });
    cy.intercept(`**/data:image/jpeg*`, { fixture: "image2_placeholder.png" });
    cy.intercept(`/data:image/jpeg;base64**`, {
      fixture: "image2_placeholder.png",
    });
    cy.intercept(`/data:image/jpeg**`, { fixture: "image2_placeholder.png" });
    cy.intercept(`data:image/**/*.*`, { fixture: "image2_placeholder.png" });
    cy.intercept(`/data:image/**`, { fixture: "image2_placeholder.png" });
    cy.intercept(`data:image/**`, { fixture: "image2_placeholder.png" });

    /* cy.intercept(
      'http://www.google.com',
      { method: 'GET', middleware: true },
      (req) => {
        req.on('before:response', (res) => {
          // force all API responses to not be cached
          res.headers['cache-control'] = 'no-store'
        })
      }
    )*/
  });

  it.skip("should check if google site is active", () => {
    cy.visit("https://www.google.com");
  });

  it("should accept privacy modal", () => {
    cy.visit("https://www.google.com")
      .get("button")
      .contains("accetta", { matchCase: false })
      .click();
  });

  it("should able to search a term and show some results", () => {
    cy.visit("https://www.google.com")
      .get("button")
      .contains("accetta", { matchCase: false })
      .click();

    // Intercept AutoComplete
    cy.intercept("GET", "/complete/*", {
      body: "some values",
    });

    cy.get('input[title="Cerca"]')
      .type("Fabio Biondi Developer{enter}")
      .as("inputSearch");

    cy.location().should((loc) => {
      expect(loc.pathname).to.contains("/search");
    });
  });

  it.only("should check if google site is active", () => {
    cy.visit("https://www.google.com/search?q=Mario+Biondi")
      .get("button")
      .contains("accetta", { matchCase: false })
      .click();
  });
});
