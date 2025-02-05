import {KeywordDisplay} from "./KeywordDisplay";

const keywords = [
  {id: 1, aliases: ["kw1", "kw11", "kw111"], displayName: "kw1", instances: 0, proficient: false},
  {id: 2, aliases: ["kw2", "kw22", "kw222"], displayName: "kw2", instances: 1, proficient: false},
  {id: 3, aliases: ["kw3", "kw33", "kw333"], displayName: "kw3", instances: 0, proficient: false},
  {id: 4, aliases: ["kw4", "kw44", "kw444"], displayName: "kw4", instances: 3, proficient: false},
  {id: 5, aliases: ["kw5", "kw55", "kw555"], displayName: "kw5", instances: 2, proficient: false},
];

describe("<KeywordDisplay />", () => {
  beforeEach(() => {
    cy.mount(
      <KeywordDisplay
        keywords={keywords}
        title="Keyword Display"
        onKeywordCreate={() => {}}
        onKeywordUpdate={() => {}}
        onKeywordDelete={() => {}}
        onCollectionUpdate={() => {}}
        onCollectionDelete={() => {}}
      />,
    );
  });

  it("renders", () => {
    cy.mount(
      <KeywordDisplay
        keywords={keywords}
        title="Keyword Display"
        onKeywordCreate={() => {}}
        onKeywordUpdate={() => {}}
        onKeywordDelete={() => {}}
        onCollectionUpdate={() => {}}
        onCollectionDelete={() => {}}
      />,
    );
  });

  describe("Form in 'edit' mode", () => {
    beforeEach(() => {
      // open form in edit mode
      cy.get("[data-cy='edit']").eq(0).click();
    });
    describe("should close", () => {
      afterEach(() => {
        cy.get("[data-cy='dialogComp']").should("not.be.visible");
      });

      it("on submit", () => {
        cy.intercept("PUT", "http://localhost:8080/api/*/*", "success");
        cy.get("[data-cy='keywordEditorComp']").find("[data-cy='submit']").click();
      });

      it("on delete", () => {
        cy.intercept("DELETE", "http://localhost:8080/api/*/*", "success");
        cy.get("[data-cy='keywordEditorComp']").find("[data-cy='delete']").click();
      });

      it("on cancel", () => {
        cy.get("[data-cy='keywordEditorComp']").find("[data-cy='cancel']").click();
      });
    });

    describe("should not close", () => {
      afterEach(() => {
        cy.get("[data-cy='dialogComp']").should("be.visible");
      });

      it("on failed submit", () => {
        cy.get("[data-cy='input']").eq(0).clear();
        cy.get("[data-cy='keywordEditorComp']").find("[data-cy='submit']").click();
      });

      it("on failed delete", () => {
        cy.intercept("DELETE", "http://localhost:8080/api/*/*", {statusCode: 404});
        cy.get("[data-cy='keywordEditorComp']").find("[data-cy='delete']").click();
      });
    });

    // if the user edits an input and cancels their changes it should not show those changes when reopening the form
    describe("should reset form input changes after canceling", () => {
      beforeEach(() => {
        // create aliases for form inputs & controls
        cy.get("[data-cy='keywordEditorComp']").within(() => {
          cy.get("[data-cy='input']").eq(0).as("displayName");
          cy.get("[data-cy='proficient']").as("proficient");
          cy.get("[data-cy='commaSeparatedInputComp']").as("CSI");
          cy.get("[data-cy='input']").eq(1).as("aliases");
          cy.get("[data-cy='submit']").as("submit");
          cy.get("[data-cy='delete']").as("delete");
          cy.get("[data-cy='cancel']").as("cancel");
        });
      });

      it("reset displayName", () => {
        cy.get("@displayName").clear().type("testDisplayName");
        cy.get("@cancel").click();

        // reopen form
        cy.get("[data-cy='edit']").eq(0).click();
        cy.get("@displayName").invoke("val").should("not.equal", "testDisplayName");
      });

      it("reset deleted aliases", () => {
        cy.get("@CSI").find("[data-cy='remove']").eq(0).click();
        cy.get("@cancel").click();

        // reopen form
        cy.get("[data-cy='edit']").eq(0).click();
        cy.get("@CSI").contains("span", "kw4").should("exist");
      });

      it("reset created aliases", () => {
        cy.get("@aliases").type("keyword 11,");
        cy.get("@cancel").click();

        // reopen form
        cy.get("[data-cy='edit']").eq(0).click();
        cy.get("@CSI").contains("span", "keyword 11").should("not.exist");
      });

      it("reset proficiency", () => {
        cy.get("@proficient").click();
        cy.get("[data-cy='cancel']").click();

        // reopen form
        cy.get("[data-cy='edit']").eq(0).click();
        cy.get("[data-cy='proficient']").should("not.be.checked");
      });
    });
  });
});
