import { mount } from "cypress/react";
import { Panel } from "../../src/pages/hello-cypress/components/Panel";

describe("<Panel />", () => {
  it("contains title and children", () => {
    mount(<Panel title="My Profile">lorem ipsum</Panel>);
    cy.document().should("contain.text", "My Profile");
    cy.get("div").should("contain.text", "lorem ipsum");
  });

  it("contains title only", () => {
    mount(<Panel title="My Profile" />);
    cy.document().should("contain.text", "My Profile");
    // cy.get('div').should('not.contain.text', 'lorem ipsum')
  });
});
