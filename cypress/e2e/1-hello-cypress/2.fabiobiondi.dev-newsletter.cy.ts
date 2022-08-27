describe("Google Search", () => {
  beforeEach(() => {
    // stub images
    // NOTE: you may need to disable cache in Browser DevTools
    cy.intercept(
      {
        method: "GET",
        url: /\/.+\.(png|svg|jpeg|webp|jpg)/, // add the regex directly
      },
      { fixture: "image2_placeholder.png" }
    );

    cy.visit("https://www.fabiobiondi.dev");
  });

  it("should subscribe the newsletter", () => {
    cy.get('input[placeholder="Enter your email"').type(
      "fakeuser@doesnotexist.it"
    );
    cy.get("button").contains("Subscribe").should("be.disabled");
  });

  it.only("should subscribe the newsletter", () => {
    cy.get('input[placeholder="Enter your email"').type(
      "fakeuser@doesnotexist.it"
    );

    // ❌ Solution 1. flag privacy policy checkbox
    // NOTE: it only works if there is only one checkbox
    // cy.get('[type="checkbox"]').check()

    // ✅ Solution 2. flag privacy policy checkbox
    // NOTE: select the adiacent label and get the sibling checkbox
    cy.get("label") // get a label
      .contains("I have read privacy") // with the privacy policy
      .siblings('[type="checkbox"]') // and get its sibling checkbox
      .check(); // checkbox

    cy.get("button").contains("Subscribe").should("be.enabled");
  });
});
