import data from "@/mockData/keywords.json";
import {Keyword} from "@/utils/types";
import KeywordDisplay from "./KeywordDisplay";

const keywords: Keyword[] = data;

describe("<KeywordDisplay />", () => {
  beforeEach(() => {
    cy.mount(
      <KeywordDisplay keywords={keywords} title="Keyword Display" onCreate={() => {}} onUpdate={() => {}} onDelete={() => {}} />,
    );
  });

  it("renders", () => {
    cy.mount(
      <KeywordDisplay keywords={keywords} title="Keyword Display" onCreate={() => {}} onUpdate={() => {}} onDelete={() => {}} />,
    );
  });

  describe("Form in 'edit' mode changes should reset upon canceling", () => {
    beforeEach(() => {
      // open form in edit mode
      cy.get("[data-cy='edit']").eq(0).click();

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

    it("should not show changed displayName after canceling", () => {
      cy.get("@displayName").clear().type("testDisplayName");
      cy.get("@cancel").click();

      // reopen form
      cy.get("[data-cy='edit']").eq(0).click();
      cy.get("@displayName").invoke("val").should("not.equal", "testDisplayName");
    });

    it("should show deleted aliases after canceling", () => {
      cy.get("@CSI").find("[data-cy='remove']").eq(0).click();
      cy.get("@cancel").click();

      // reopen form
      cy.get("[data-cy='edit']").eq(0).click();
      cy.get("@CSI").contains("span", "kw4").should("exist");
    });

    it("should not show new aliases after canceling", () => {
      cy.get("@aliases").type("keyword 11,");
      cy.get("@cancel").click();

      // reopen form
      cy.get("[data-cy='edit']").eq(0).click();
      cy.get("@CSI").contains("span", "keyword 11").should("not.exist");
    });

    it("should not show the changed proficiency", () => {
      cy.get("@proficient").click();
      cy.get("[data-cy='cancel']").click();

      // reopen form
      cy.get("[data-cy='edit']").eq(0).click();
      cy.get("[data-cy='proficient']").should("not.be.checked");
    });
  });
});
