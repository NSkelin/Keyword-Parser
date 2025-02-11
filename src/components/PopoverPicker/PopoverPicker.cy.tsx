import {PopoverPicker} from "./PopoverPicker";

describe("<PopoverPicker />", () => {
  beforeEach(() => {
    cy.mount(
      <div style={{height: "300px"}}>
        <PopoverPicker color="lightblue" onConfirm={cy.spy().as("onSubmit")} onChange={cy.spy().as("onChange")} />
      </div>,
    );
  });

  it("renders", () => {
    cy.mount(<PopoverPicker color="red" onChange={() => {}} onConfirm={() => {}} />);
  });

  it("should open the popover when clicking the swatch", () => {
    cy.get("[data-cy=swatchButton").click();
    cy.get("[data-cy=popOver").should("be.visible");
  });

  it("should call the onChange event when clicking the hexColorPicker", () => {
    cy.get("[data-cy=swatchButton").click();
    cy.get("[data-cy=hexColorPicker").click();
    cy.get("@onChange").should("have.been.called");
  });

  describe("submit changes", () => {
    [
      {
        name: "with submit button",
        exit: () => {
          cy.get("[data-cy=submitButton]").click();
        },
      },
      {
        name: "with pressing enter",
        exit: () => {
          cy.get("body").type("{enter}");
        },
      },
    ].forEach(({name, exit}) => {
      describe(`${name}`, () => {
        beforeEach(() => {
          cy.get("[data-cy=swatchButton]").click();
        });

        it("should call the onSubmit event", () => {
          exit();
          cy.get("@onSubmit").should("have.been.called");
        });

        it("should not render the popover", () => {
          exit();
          cy.get("[data-cy=popOver]").should("not.exist");
        });
      });
    });
  });
  describe("cancel changes", () => {
    [
      {
        name: "with cancel button",
        exit: () => {
          cy.get("[data-cy=cancelButton]").click();
        },
      },
      {
        name: "with clicking outside",
        exit: () => {
          cy.get("body").click(300, 100);
        },
      },
      {
        name: "with pressing escape",
        exit: () => {
          cy.get("body").type("{esc}");
        },
      },
    ].forEach(({name, exit}) => {
      describe(`${name}`, () => {
        beforeEach(() => {
          cy.get("[data-cy=swatchButton]").click();
        });

        it("should call the onChange event", () => {
          exit();
          cy.get("@onChange").should("have.been.called");
        });

        it("should not render the popover", () => {
          exit();
          cy.get("[data-cy=popOver]").should("not.exist");
        });
      });
    });
  });
});
