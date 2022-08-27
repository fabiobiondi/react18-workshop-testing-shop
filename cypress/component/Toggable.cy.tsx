import { mount } from "cypress/react";
import { Toggable } from "../../src/pages/hello-cypress/components/Togglable";

describe("<Toggable /> ", () => {
  it("contains title and children", () => {
    mount(<Toggable title="My Profile">lorem ipsum</Toggable>);
    cy.document().should("contain.text", "My Profile");
  });

  it("not display children when component is mounted", () => {
    mount(<Toggable title="My Profile">lorem ipsum</Toggable>);
    cy.document().should("not.contain.text", "lorem ipsum");
  });

  it("display children when component is opened", () => {
    mount(
      <Toggable title="My Profile" open>
        lorem ipsum
      </Toggable>
    );
    cy.document().should("contain.text", "lorem ipsum");
  });

  it("display children when title bar is clicked", () => {
    mount(<Toggable title="My Profile">lorem ipsum</Toggable>);
    cy.document().contains("My Profile").trigger("click");

    cy.document().should("contain.text", "lorem ipsum");
  });

  it("display children when title bar is clicked", () => {
    mount(<Toggable title="My Profile">lorem ipsum</Toggable>);
    cy.document().contains("My Profile").trigger("click");
    cy.document().should("contain.text", "lorem ipsum");
  });

  it("invoke callback when icon is clicked", () => {
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
