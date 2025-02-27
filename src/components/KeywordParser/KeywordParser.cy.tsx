import {mockSectionData} from "@/mockData";
import {generateMockDisplays} from "@/mockData/displays";
import {KeywordParser} from "./KeywordParser";

describe("<KeywordParser />", () => {
  beforeEach(() => {
    cy.mount(<KeywordParser initialDisplays={generateMockDisplays(3, 4)} sectionData={mockSectionData} />);

    cy.get(".notranslate").as("textArea");
  });

  it("renders", () => {
    cy.mount(<KeywordParser initialDisplays={generateMockDisplays(3, 4)} sectionData={mockSectionData} />);
  });

  describe("<KeywordDisplay /> should represent the text in <HighlightWithinTextArea />", () => {
    it("a keywords count should equal the total instances of that keyword found inside the textarea", () => {
      cy.get("@textArea").type("kw1 1 kw1 1 keyword1 1 kw2 2 kw2 2");

      cy.get("[data-cy='keywordItemComp']")
        .filter(":contains('Keyword 1 1')")
        .find("[data-cy='instances']")
        .invoke("text")
        .should("eq", "3");
      cy.get("[data-cy='keywordItemComp']")
        .filter(":contains('Keyword 2 2')")
        .find("[data-cy='instances']")
        .invoke("text")
        .should("eq", "2");
      cy.get("[data-cy='keywordItemComp']")
        .filter(":contains('Keyword 2 1')")
        .find("[data-cy='instances']")
        .invoke("text")
        .should("eq", "0");
    });

    it("should highlight the keyword list item that matches the entered text", () => {
      cy.get("@textArea").type("kw1 1");
      cy.get("[data-cy='keywordDisplayComp']")
        .eq(0)
        .find("[data-cy='keywordListComp']")
        .find("[data-cy='highlight']")
        .should("be.visible");
    });

    it("should not highlight the keyword after removing the matching text", () => {
      cy.get("@textArea").type("kw1-1");
      cy.get("@textArea").clear();
      cy.get("[data-cy='keywordDisplayComp']")
        .eq(0)
        .find("[data-cy='keywordListComp']")
        .find("[data-cy='highlight']")
        .should("not.be.visible");
    });
  });

  describe("Test the keyword form updates the content properly", () => {
    beforeEach(() => {
      // setup mock api responses for keyword form
      cy.intercept("POST", "http://localhost:8080/api/Display*", {body: {id: 11}});
      cy.intercept("DELETE", "http://localhost:8080/api/*/*", "success");
      cy.intercept("PUT", "http://localhost:8080/api/*/*", "success");

      cy.get("[data-cy='input']").eq(0).as("displayName");
      cy.get("[data-cy='input']").eq(1).as("aliases");
    });

    it("should successfully add a keyword", () => {
      cy.get("[data-cy='keywordDisplayComp']").eq(0).find("[data-cy='create']").click();
      cy.get("[data-cy='keywordEditorComp']")
        .eq(0)
        .within(() => {
          cy.get("@displayName").type("testDisplayName");
          cy.get("[data-cy='proficient']").check();
          cy.get("@aliases").type("testDisplayName, test, displayname,");
          cy.get("[data-cy='submit']").click();
        });
      cy.get("[data-cy='keywordListComp']").contains("testDisplayName").should("exist");
    });

    it("should successfully remove a keyword", () => {
      cy.get("[data-cy='keywordListComp']").eq(0).find("[data-cy='edit']").eq(0).click();
      cy.get("[data-cy='keywordEditorComp']")
        .eq(0)
        .within(() => {
          cy.get("[data-cy='delete']").click();
        });
      cy.get("[data-cy='keywordListComp']").contains("Keyword 1-1").should("not.exist");
    });

    it("should update the keywords display name", () => {
      cy.get("[data-cy='keywordListComp']").eq(0).find("[data-cy='edit']").eq(0).click();
      cy.get("[data-cy='keywordEditorComp']")
        .eq(0)
        .within(() => {
          cy.get("@displayName").clear().type("testDisplayName");
          cy.get("[data-cy='submit']").click();
        });
      cy.get("[data-cy='keywordListComp']").contains("testDisplayName").should("exist");
    });
  });
});
