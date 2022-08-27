describe("Google Search", () => {
  beforeEach(() => {});

  it("should Contact Form button redirect to contact", () => {
    cy.visit("https://www.fabiobiondi.dev");
    cy.contains("Contact Form").click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/contacts");
    });
  });

  it("should the submit button be enabled if form is valid", () => {
    cy.visit("https://www.fabiobiondi.dev/contacts");
    cy.get('input[name="name"]').type("Fabio Biondi");
    cy.get('input[name="email"]').type("info@fabiobiondi.com");
    cy.get('textarea[name="message"]').type("lorem ipsum...");
    cy.get("button")
      .contains("Submit", { matchCase: false })
      .should("be.enabled");
  });

  /**
   * Test validators
   * NOTE: we should test all use cases to be sure the form works in every scenario
   */
  it("should the submit button be disabled if missin message and email", () => {
    cy.visit("https://www.fabiobiondi.dev/contacts");
    cy.get('input[name="name"]').type("Fabio Biondi");
    // missing name and message
    cy.get("button")
      .contains("Submit", { matchCase: false })
      .should("be.disabled");
  });

  it("should the submit button display the SENT label if form is sent", () => {
    cy.intercept(`https://api.emailjs.com/**`, { method: "POST" }, "OK");

    cy.visit("https://www.fabiobiondi.dev/contacts");
    cy.get('input[name="name"]').type("Fabio Biondi");
    cy.get('input[name="email"]').type("info@fabiobiondi.com");
    cy.get('textarea[name="message"]').type("lorem ipsum...");
    cy.get("button")
      .contains("Submit", { matchCase: false })
      .click()
      .should("be.disabled")
      .should("contain", "SENT");
  });

  /**
   * NOTE:
   * After this test I have noticed my website does not handle errors in the right way:
   * I don't show any error and user cannot re-try to send a message
   * I DEFINITELY SHOULD FIX IT 😅
   */
  it("should the submit button be disabled in case of request error", () => {
    cy.intercept("POST", `https://api.emailjs.com/**`, {
      statusCode: 400,
      body: "some errors",
    });

    cy.visit("https://www.fabiobiondi.dev/contacts");
    cy.get('input[name="name"]').type("Fabio Biondi");
    cy.get('input[name="email"]').type("info@fabiobiondi.com");
    cy.get('textarea[name="message"]').type("lorem ipsum...");
    cy.get("button")
      .contains("Submit", { matchCase: false })
      .click()
      .should("be.disabled");
  });
});
