import {generateMockKeywords} from "@/mockData";
import {KeywordDisplay} from "./KeywordDisplay";

const keywords = generateMockKeywords(1, 5);

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

  describe("Forms", () => {
    describe("Delete collection form", () => {
      it("should still open the delete collection dialog after previously closing it", () => {
        cy.get("[data-cy=deleteButton]").click();
        cy.get("[data-cy=dialogComp]")
          .eq(1)
          .should("be.visible")
          .within(() => {
            cy.get("[data-cy=cancelButton]").click();
          });
        cy.get("[data-cy=dialogComp]").should("not.be.visible");
        cy.get("[data-cy=deleteButton]").click();
        cy.get("[data-cy=dialogComp]").eq(1).should("be.visible");
      });
    });

    describe("Edit keyword form", () => {
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
          cy.get("@CSI").contains("span", "keyword1 5").should("exist");
        });

        it("reset created aliases", () => {
          cy.get("@aliases").type("keyword1 1,");
          cy.get("@cancel").click();

          // reopen form
          cy.get("[data-cy='edit']").eq(0).click();
          cy.get("@CSI").contains("span", "keyword1 1").should("not.exist");
        });

        it("reset proficiency", () => {
          cy.get("@proficient").click();
          cy.get("[data-cy='cancel']").click();

          // reopen form
          cy.get("[data-cy='edit']").eq(0).click();
          cy.get("[data-cy='proficient']").should("be.checked");
        });
      });

      it("should still open the edit keyword dialog after previously closing it", () => {
        cy.get("[data-cy=dialogComp]")
          .eq(0)
          .should("be.visible")
          .within(() => {
            cy.get("[data-cy=cancel]").click();
          });
        cy.get("[data-cy=dialogComp]").should("not.be.visible");
        cy.get("[data-cy='edit']").eq(0).click();
        cy.get("[data-cy=dialogComp]").eq(0).should("be.visible");
      });
    });

    describe("Add keyword form", () => {
      it("should still open the delete collection dialog after previously closing it", () => {
        cy.get("[data-cy=create]").click();
        cy.get("[data-cy=dialogComp]")
          .eq(0)
          .should("be.visible")
          .within(() => {
            cy.get("[data-cy=cancel]").click();
          });
        cy.get("[data-cy=dialogComp]").should("not.be.visible");
        cy.get("[data-cy=create]").click();
        cy.get("[data-cy=dialogComp]").eq(0).should("be.visible");
      });
    });
  });
});
