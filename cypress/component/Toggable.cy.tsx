import { mount } from "cypress/react";
import { Toggable } from "../../src/pages/hello-cypress/components/Togglable";

describe("<Toggable /> ", () => {
  it("should display title and children by default", () => {
    mount(<Toggable title="My Profile">lorem ipsum</Toggable>);
    cy.document().should("contain.text", "My Profile");
    cy.document().should("contain.text", "lorem ipsum");
  });

  it("should display children when component is opened", () => {
    mount(
      <Toggable title="My Profile" open>
        lorem ipsum
      </Toggable>
    );
    cy.document().should("contain.text", "lorem ipsum");
  });

  it("should not display children when component is mounted", () => {
    mount(
      <Toggable title="My Profile" open={false}>
        lorem ipsum
      </Toggable>
    );
    cy.document().should("not.contain.text", "lorem ipsum");
  });

  it("should toggle children when title bar is clicked", () => {
    mount(<Toggable title="My Profile">lorem ipsum</Toggable>);
    // click to close
    cy.document().contains("My Profile").trigger("click");
    cy.document().should("not.contain.text", "lorem ipsum");

    // another click to open
    cy.document().contains("My Profile").trigger("click");
    cy.document().should("contain.text", "lorem ipsum");
  });

  it("should display an icon in the titlebar", () => {
    mount(
      <Toggable title="My Profile" icon="💩">
        lorem ipsum
      </Toggable>
    );
    // SOLUTION 1: check if the document contains '💩'
    cy.document().contains("💩");

    // SOLUTION 2: check if the titlebar contains a closest icon '💩'
    cy.document()
      .contains("My Profile")
      .siblings()
      .within(() => {
        cy.contains("💩");
      });
  });

  it("should invoke callback when icon is clicked", () => {
    const onClickSpy = cy.spy().as("onClickSpy"); // alias
    mount(
      <Toggable title="My Profile" icon="💩" onIconClick={onClickSpy} open>
        lorem ipsum
      </Toggable>
    );
    const icon = cy.document().contains("💩");
    icon.trigger("click");
    cy.get("@onClickSpy").should("have.been.called");
  });
});
