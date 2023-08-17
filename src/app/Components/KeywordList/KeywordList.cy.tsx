import {Keyword} from "@/utils/types";
import KeywordList from "./KeywordList";

const keywords: Keyword[] = [
  {id: 1, aliases: ["kw1"], displayName: "kw1", instances: 0, proficient: false},
  {id: 2, aliases: ["kw2"], displayName: "kw2", instances: 1, proficient: false},
  {id: 3, aliases: ["kw3"], displayName: "kw3", instances: 0, proficient: false},
  {id: 4, aliases: ["kw4"], displayName: "kw4", instances: 3, proficient: false},
  {id: 5, aliases: ["kw5"], displayName: "kw5", instances: 2, proficient: false},
];

describe("<KeywordParser />", () => {
  beforeEach(() => {
    cy.mount(<KeywordList keywords={keywords} onEdit={() => {}} />);
  });

  it("renders", () => {
    cy.mount(<KeywordList keywords={keywords} onEdit={() => {}} />);
  });

  it("should sort keywords in descending order by instance count, followed by alphabetically", () => {
    cy.get("[data-cy='keywordItemComp']").eq(0).should("contain.text", "kw4");
    cy.get("[data-cy='keywordItemComp']").eq(1).should("contain.text", "kw5");
    cy.get("[data-cy='keywordItemComp']").eq(2).should("contain.text", "kw2");
    cy.get("[data-cy='keywordItemComp']").eq(3).should("contain.text", "kw1");
    cy.get("[data-cy='keywordItemComp']").eq(4).should("contain.text", "kw3");
  });
});
