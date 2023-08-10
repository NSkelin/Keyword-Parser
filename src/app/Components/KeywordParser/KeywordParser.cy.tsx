import {mockKeywordDisplay, mockSectionData} from "@/mockData";
import React from "react";
import KeywordParser from "./KeywordParser";

describe("<KeywordParser />", () => {
  beforeEach(() => {
    cy.mount(<KeywordParser initialDisplays={mockKeywordDisplay} sectionData={mockSectionData} />);
  });

  it("renders", () => {
    cy.mount(<KeywordParser initialDisplays={mockKeywordDisplay} sectionData={mockSectionData} />);
  });

  describe("Test text updates in <HighlightWithinTextArea /> update <KeywordDisplay />'s correctly", () => {
    it("should place the found keyword first, before other keywords", () => {
      cy.get(".notranslate").type("kw1-3");
      cy.get(":nth-child(1) > [data-cy='kw-itemList'] > :nth-child(1)").should("contain.text", "Keyword 1-3");
    });

    it("should highlight the keyword list item that matches the entered text", () => {
      cy.get(".notranslate").type("kw1-1");
      cy.get(":nth-child(1) > [data-cy='kw-itemList'] > :nth-child(1)").find("[data-cy='kw-itemHighlight']").should("be.visible");
    });

    it("should not highlight the keyword after removing the matching text", () => {
      cy.get(".notranslate").type("kw1-1");
      cy.get(".notranslate").clear();
      cy.get(":nth-child(1) > [data-cy='kw-itemList'] > :nth-child(1)")
        .find("[data-cy='kw-itemHighlight']")
        .should("not.be.visible");
    });
  });

  describe("Test the keyword form updates the content properly", () => {
    it("should successfully add a keyword", () => {
      cy.intercept("POST", "http://localhost:8080/api/Display*", {body: {id: 11}});
      cy.get(":nth-child(1) > :nth-child(2) > [data-cy='kw-addKeyword']").click();
      cy.get("[data-cy='kw-form']")
        .eq(0)
        .within(() => {
          cy.get("[data-cy='displayName']").type("testDisplayName");
          cy.get("[data-cy='proficient']").check();
          cy.get("[data-cy='commaSeparatedInput']").type("testDisplayName, test, displayname,");
          cy.get("[data-cy='submit']").click();
        });
      cy.get("[data-cy='kw-itemList']").contains("testDisplayName").should("exist");
    });

    it("should successfully remove a keyword", () => {
      cy.intercept("DELETE", "http://localhost:8080/api/*/*", "success");
      cy.get(":nth-child(1) > [data-cy='kw-itemList'] > :nth-child(1)").find("[data-cy='edit']").click();
      cy.get("[data-cy='kw-form']")
        .eq(0)
        .within(() => {
          cy.get("[data-cy='delete']").click();
        });
      cy.get("[data-cy='kw-itemList']").contains("Keyword 1-1").should("not.exist");
    });

    it("should update the keywords display name", () => {
      cy.intercept("PUT", "http://localhost:8080/api/*/*", "success");
      cy.get(":nth-child(1) > [data-cy='kw-itemList'] > :nth-child(1)").find("[data-cy='edit']").click();
      cy.get("[data-cy='kw-form']")
        .eq(0)
        .within(() => {
          cy.get("[data-cy='displayName']").type("testDisplayName");
          cy.get("[data-cy='submit']").click();
        });
      cy.get("[data-cy='kw-itemList']").contains("testDisplayName").should("exist");
    });
  });
});
