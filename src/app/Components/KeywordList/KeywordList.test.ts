import {sortList} from "./KeywordList";

type Keywords = {displayName: string; instances: number; proficient: boolean}[];

describe("sortList", () => {
  test("should sort the list in descending order based on instances", () => {
    const keywords: Keywords = [
      {displayName: "Katie", instances: 1, proficient: true},
      {displayName: "John", instances: 3, proficient: false},
      {displayName: "Dillard", instances: 2, proficient: false},
    ];

    const sortedList = sortList(keywords);

    const sortedKeywords: Keywords = [
      {displayName: "John", instances: 3, proficient: false},
      {displayName: "Dillard", instances: 2, proficient: false},
      {displayName: "Katie", instances: 1, proficient: true},
    ];

    expect(sortedList).toEqual(sortedKeywords);
  });

  test("should sort the list alphabetically by name", () => {
    const keywords: Keywords = [
      {displayName: "Katie", instances: 1, proficient: true},
      {displayName: "John", instances: 1, proficient: false},
      {displayName: "Dillard", instances: 1, proficient: false},
    ];

    const sortedList = sortList(keywords);

    const sortedKeywords: Keywords = [
      {displayName: "Dillard", instances: 1, proficient: false},
      {displayName: "John", instances: 1, proficient: false},
      {displayName: "Katie", instances: 1, proficient: true},
    ];

    expect(sortedList).toEqual(sortedKeywords);
  });

  test("should sort alphabetically for numbers that are the same", () => {
    const keywords = [
      {displayName: "Katie", instances: 1, proficient: true},
      {displayName: "John", instances: 2, proficient: false},
      {displayName: "Dillard", instances: 2, proficient: false},
    ];

    const sortedList = sortList(keywords);

    const sortedKeywords = [
      {displayName: "Dillard", instances: 2, proficient: false},
      {displayName: "John", instances: 2, proficient: false},
      {displayName: "Katie", instances: 1, proficient: true},
    ];

    expect(sortedList).toEqual(sortedKeywords);
  });

  test("should sort words starting with a lowercase letter should be sorted equally with words starting with a uppercase letter.", () => {
    const keywords = [
      {displayName: "jquery", instances: 2, proficient: true},
      {displayName: "John", instances: 2, proficient: false},
      {displayName: "Kerry", instances: 2, proficient: false},
    ];

    const sortedList = sortList(keywords);

    const sortedKeywords = [
      {displayName: "John", instances: 2, proficient: false},
      {displayName: "jquery", instances: 2, proficient: true},
      {displayName: "Kerry", instances: 2, proficient: false},
    ];

    expect(sortedList).toEqual(sortedKeywords);
  });
});
