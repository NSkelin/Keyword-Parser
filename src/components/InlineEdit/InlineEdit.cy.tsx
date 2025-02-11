import {InlineEdit} from "./InlineEdit";

describe("<InlineEdit />", () => {
  beforeEach(() => {
    cy.mount(
      <div style={{height: "300px"}}>
        <InlineEdit defaultValue="Default Value" onSave={cy.spy().as("onSave")} onCancel={cy.spy().as("onCancel")}>
          <div data-cy="childComp">Text</div>
        </InlineEdit>
        ,
      </div>,
    );
  });

  it("renders", () => {
    cy.mount(<InlineEdit defaultValue="default" onSave={() => {}} />);
  });

  it("should open edit mode when clicking the component", () => {
    cy.get("[data-cy=inlineEditComp]").click();
    cy.get("[data-cy=editingContainer]").should("exist");
  });

  it("should not open edit mode when clicking outside the component", () => {
    cy.get("body").click(0, 100);
    cy.get("[data-cy=editingContainer]").should("not.exist");
  });

  it("should render editing UI when in edit mode", () => {
    cy.get("[data-cy=inlineEditComp]").click();
    cy.get("[data-cy=editingContainer]").should("be.visible");
  });

  it("should render children when not in edit mode", () => {
    cy.get("[data-cy=childComp]").should("exist");
  });

  it("should have input value matching defaultValue when first opened", () => {
    cy.get("[data-cy=inlineEditComp]").click();
    cy.get("input").should("have.value", "Default Value");
  });

  it("should select input when entering edit mode", () => {
    cy.get("[data-cy=inlineEditComp]").click();
    cy.get("input").should("be.focused");
  });

  it("should not switch off edit mode when clicking inside the component", () => {
    cy.get("[data-cy=inlineEditComp]").click();
    cy.get("[data-cy=editingContainer]").click();
    cy.get("[data-cy=editingContainer]").should("exist");
  });

  describe("submitting edit", () => {
    [
      {
        name: "with submit button",
        functions: () => {
          cy.get("[data-cy=submitButton]").click();
        },
      },
      {
        name: "with pressing enter",
        functions: () => {
          cy.get("input").type("{enter}");
        },
      },
    ].forEach(({name, functions}) => {
      describe(`${name}`, () => {
        beforeEach(() => {
          cy.get("[data-cy=inlineEditComp]").click();
        });

        it("should call the onSave event", () => {
          functions();
          cy.get("@onSave").should("have.been.called");
        });

        it("should close edit mode", () => {
          functions();
          cy.get("[data-cy=editingContainer]").should("not.exist");
        });
      });
    });
  });

  describe("canceling edit", () => {
    [
      {
        name: "with cancel button",
        functions: () => {
          cy.get("[data-cy=cancelButton]").click();
        },
      },
      {
        name: "with clicking outside",
        functions: () => {
          cy.get("body").click(0, 100);
        },
      },
      {
        name: "with pressing escape",
        functions: () => {
          cy.get("input").type("{esc}");
        },
      },
    ].forEach(({name, functions}) => {
      describe(`${name}`, () => {
        beforeEach(() => {
          cy.get("[data-cy=inlineEditComp]").click();
        });

        it("should call the onCancel event", () => {
          functions();
          cy.get("@onCancel").should("have.been.called");
        });

        it("should close edit mode", () => {
          functions();
          cy.get("[data-cy=editingContainer]").should("not.exist");
        });

        it("should revert changes in the input", () => {
          cy.get("input").type("bolognese");
          functions();
          cy.get("[data-cy=inlineEditComp]").click();
          cy.get("input").should("have.value", "Default Value");
        });
      });
    });
  });
});
