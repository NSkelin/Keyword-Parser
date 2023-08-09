import {mockKeywordDisplay, mockSectionData} from "@/mockData";
import React from "react";
import KeywordParser from "./KeywordParser";

describe("<KeywordParser />", () => {
  it("renders", () => {
    cy.mount(<KeywordParser initialDisplays={mockKeywordDisplay} sectionData={mockSectionData} />);
  });

  describe("Test text updates in <HighlightWithinTextArea /> update <KeywordDisplay />'s correctly", () => {
    it("should place the found keyword first, before other keywords", () => {
      cy.mount(<KeywordParser initialDisplays={mockKeywordDisplay} sectionData={mockSectionData} />);
      cy.get(".notranslate").type("kw1-3");
      cy.get(":nth-child(1) > [data-cy='kw-itemList'] > :nth-child(1)").should("contain.text", "Keyword 1-3");
    });

    it("should highlight the keyword list item that matches the entered text", () => {
      cy.mount(<KeywordParser initialDisplays={mockKeywordDisplay} sectionData={mockSectionData} />);
      cy.get(".notranslate").type("kw1-1");
      cy.get(":nth-child(1) > [data-cy='kw-itemList'] > :nth-child(1)").find("[data-cy='kw-itemHighlight']").should("be.visible");
    });

    it("should not highlight the keyword after removing the matching text", () => {
      cy.mount(<KeywordParser initialDisplays={mockKeywordDisplay} sectionData={mockSectionData} />);
      cy.get(".notranslate").type("kw1-1");
      cy.get(".notranslate").clear();
      cy.get(":nth-child(1) > [data-cy='kw-itemList'] > :nth-child(1)")
        .find("[data-cy='kw-itemHighlight']")
        .should("not.be.visible");
    });
  });
});
