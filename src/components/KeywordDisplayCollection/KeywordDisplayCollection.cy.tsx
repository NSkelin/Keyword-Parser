import {getMockDisplays} from "@/mockData";
import {KeywordDisplayCollection} from "./KeywordDisplayCollection";

describe("<KeywordDisplayCollection />", () => {
  beforeEach(() => {
    cy.mount(
      <KeywordDisplayCollection
        displays={getMockDisplays(3)}
        onCollectionCreate={() => {}}
        onCollectionDelete={() => {}}
        onCollectionUpdate={() => {}}
        onKeywordCreate={() => {}}
        onKeywordDelete={() => {}}
        onKeywordUpdate={() => {}}
      />,
    );
  });

  it("renders", () => {
    cy.mount(
      <KeywordDisplayCollection
        displays={getMockDisplays(1)}
        onCollectionCreate={() => {}}
        onCollectionDelete={() => {}}
        onCollectionUpdate={() => {}}
        onKeywordCreate={() => {}}
        onKeywordDelete={() => {}}
        onKeywordUpdate={() => {}}
      />,
    );
  });

  it("should still open the new collection dialog after previously closing it", () => {
    cy.get("[data-cy=openButton]").click();
    cy.get("[data-cy=dialogComp]").should("be.visible");
    cy.get("[data-cy=cancelButton]").click();
    cy.get("[data-cy=dialogComp]").should("not.be.visible");
    cy.get("[data-cy=openButton]").click();
    cy.get("[data-cy=dialogComp]").should("be.visible");
  });
});
