import { mount } from "cypress/react";
import { Panel } from "../../src/pages/hello-cypress/components/Panel";

describe("<Panel />", () => {
  it("should display title and children if defined", () => {
    mount(<Panel title="My Profile">lorem ipsum</Panel>);
    cy.document().should("contain.text", "My Profile");
    cy.get("div").should("contain.text", "lorem ipsum");
  });

  it("should contains title only", () => {
    mount(<Panel title="My Profile" />);
    cy.document().should("contain.text", "My Profile");
  });

  it("should contains children only", () => {
    mount(<Panel>lorem ipsum</Panel>);
    cy.get("div").should("contain.text", "lorem ipsum");
  });
});
