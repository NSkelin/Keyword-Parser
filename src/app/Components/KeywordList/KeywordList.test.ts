import {sortList} from "./KeywordList";

type Keywords = {displayName: string; instances: number; proficient: boolean}[];

describe("sortList", () => {
  it("should sort the list in descending order based on instances", () => {
    const keywords = [
      {id: 1, displayName: "Katie", instances: 1, proficient: true, aliases: []},
      {id: 2, displayName: "John", instances: 3, proficient: false, aliases: []},
      {id: 3, displayName: "Dillard", instances: 2, proficient: false, aliases: []},
    ];

    const sortedList = sortList(keywords);

    const sortedKeywords = [
      {id: 2, displayName: "John", instances: 3, proficient: false, aliases: []},
      {id: 3, displayName: "Dillard", instances: 2, proficient: false, aliases: []},
      {id: 1, displayName: "Katie", instances: 1, proficient: true, aliases: []},
    ];

    expect(sortedList).toEqual(sortedKeywords);
  });

  it("should sort the list alphabetically by name", () => {
    const keywords = [
      {id: 1, displayName: "Katie", instances: 1, proficient: true, aliases: []},
      {id: 2, displayName: "John", instances: 1, proficient: false, aliases: []},
      {id: 3, displayName: "Dillard", instances: 1, proficient: false, aliases: []},
    ];

    const sortedList = sortList(keywords);

    const sortedKeywords = [
      {id: 3, displayName: "Dillard", instances: 1, proficient: false, aliases: []},
      {id: 2, displayName: "John", instances: 1, proficient: false, aliases: []},
      {id: 1, displayName: "Katie", instances: 1, proficient: true, aliases: []},
    ];

    expect(sortedList).toEqual(sortedKeywords);
  });

  it("should sort alphabetically for numbers that are the same", () => {
    const keywords = [
      {id: 1, displayName: "Katie", instances: 1, proficient: true, aliases: []},
      {id: 2, displayName: "John", instances: 2, proficient: false, aliases: []},
      {id: 3, displayName: "Dillard", instances: 2, proficient: false, aliases: []},
    ];

    const sortedList = sortList(keywords);

    const sortedKeywords = [
      {id: 3, displayName: "Dillard", instances: 2, proficient: false, aliases: []},
      {id: 2, displayName: "John", instances: 2, proficient: false, aliases: []},
      {id: 1, displayName: "Katie", instances: 1, proficient: true, aliases: []},
    ];

    expect(sortedList).toEqual(sortedKeywords);
  });

  it("should sort words starting with a lowercase letter should be sorted equally with words starting with a uppercase letter.", () => {
    const keywords = [
      {id: 1, displayName: "jquery", instances: 2, proficient: true, aliases: []},
      {id: 2, displayName: "John", instances: 2, proficient: false, aliases: []},
      {id: 3, displayName: "Kerry", instances: 2, proficient: false, aliases: []},
    ];

    const sortedList = sortList(keywords);

    const sortedKeywords = [
      {id: 2, displayName: "John", instances: 2, proficient: false, aliases: []},
      {id: 1, displayName: "jquery", instances: 2, proficient: true, aliases: []},
      {id: 3, displayName: "Kerry", instances: 2, proficient: false, aliases: []},
    ];

    expect(sortedList).toEqual(sortedKeywords);
  });
});
