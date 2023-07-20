import {
  createKeywordsRegEx,
  getAliases,
  getFoundProficientKeywords,
  getInstancedKeywords,
  getMatches,
  getUniqueMatches,
} from "./utils";

interface Keyword {
  displayName: string;
  instances: number;
  proficient: boolean;
  aliases: string[];
}

describe("createKeywordsRegEx", () => {
  it("should find all single keyword in the text", () => {
    const keywords = ["keyword1", "keyword2", "keyword3"];
    const regex = createKeywordsRegEx(keywords);
    const textToMatch = "This is a sample text with keyword1, keyword2, and keyword3.";
    const matches = textToMatch.match(regex);
    const expectedMatches = ["keyword1", "keyword2", "keyword3"];
    expect(matches).toEqual(expectedMatches);
  });


  it("should find keywords with different cases in the text", () => {
    const keywords = ["KEYWORD1", "KeYwOrD2"];
    const regex = createKeywordsRegEx(keywords);
    const textToMatch = "This is a sample text with Keyword1 and keyWORD2.";
    const matches = textToMatch.match(regex);
    const expectedMatches = ["Keyword1", "keyWORD2"];
    expect(matches).toEqual(expectedMatches);
  });
});

describe("getAliases", () => {
  it("should return an empty array when keywords array is empty", () => {
    const keywords: Keyword[] = [];
    const result = getAliases(keywords);
    expect(result).toEqual([]);
  });

  it("should return an array containing all the aliases", () => {
    const keywords = [
      {
        displayName: "Keyword 1",
        instances: 3,
        proficient: true,
        aliases: ["kw1", "k1", "word1"],
      },
      {
        displayName: "Keyword 2",
        instances: 2,
        proficient: false,
        aliases: ["kw2", "k2", "word2"],
      },
      {
        displayName: "Keyword 3",
        instances: 1,
        proficient: true,
        aliases: ["kw3", "k3", "word3"],
      },
    ];

    const result = getAliases(keywords);

    // Concatenate all the aliases from the keywords array and compare with the expected result
    const expectedAliases = ["kw1", "k1", "word1", "kw2", "k2", "word2", "kw3", "k3", "word3"];
    expect(result).toEqual(expectedAliases);
  });

  it("should return an empty array when no aliases are provided", () => {
    const keywords = [
      {
        displayName: "Keyword 4",
        instances: 1,
        proficient: false,
        aliases: [], // Empty aliases array
      },
      {
        displayName: "Keyword 5",
        instances: 2,
        proficient: true,
        aliases: [], // Empty aliases array
      },
    ];

    const result = getAliases(keywords);
    expect(result).toEqual([]);
  });
});

describe("getFoundProficientKeywords", () => {
  it("should return an empty array when no keywords are provided", () => {
    const keywords: Keyword[] = [];
    const result = getFoundProficientKeywords(keywords);
    expect(result).toEqual([]);
  });

  it("should return an empty array when no keywords are proficient", () => {
    const keywords = [
      {
        displayName: "Keyword 1",
        instances: 3,
        proficient: false,
        aliases: ["kw1", "k1", "word1"],
      },
      {
        displayName: "Keyword 2",
        instances: 2,
        proficient: false,
        aliases: ["kw2", "k2", "word2"],
      },
    ];

    const result = getFoundProficientKeywords(keywords);
    expect(result).toEqual([]);
  });

  it("should return keywords that are proficient and have instances > 0", () => {
    const keywords = [
      {
        displayName: "Keyword 3",
        instances: 0,
        proficient: true,
        aliases: ["kw3", "k3", "word3"],
      },
      {
        displayName: "Keyword 4",
        instances: 1,
        proficient: true,
        aliases: ["kw4", "k4", "word4"],
      },
      {
        displayName: "Keyword 5",
        instances: 2,
        proficient: false,
        aliases: ["kw5", "k5", "word5"],
      },
      {
        displayName: "Keyword 6",
        instances: 3,
        proficient: true,
        aliases: ["kw6", "k6", "word6"],
      },
    ];

    const result = getFoundProficientKeywords(keywords);

    // Only keywords 4 and 6 are proficient with instances > 0
    const expectedKeywords = [
      {
        displayName: "Keyword 4",
        instances: 1,
        proficient: true,
        aliases: ["kw4", "k4", "word4"],
      },
      {
        displayName: "Keyword 6",
        instances: 3,
        proficient: true,
        aliases: ["kw6", "k6", "word6"],
      },
    ];

    expect(result).toEqual(expectedKeywords);
  });
});

describe("getInstancedKeywords", () => {
  it("should return an empty array when no keywords are provided", () => {
    const keywords: Keyword[] = [];
    const result = getInstancedKeywords(keywords);
    expect(result).toEqual([]);
  });

  it("should return an empty array when no keywords have instances > 0", () => {
    const keywords = [
      {
        displayName: "Keyword 1",
        instances: 0,
        proficient: true,
        aliases: ["kw1", "k1", "word1"],
      },
      {
        displayName: "Keyword 2",
        instances: 0,
        proficient: false,
        aliases: ["kw2", "k2", "word2"],
      },
    ];

    const result = getInstancedKeywords(keywords);
    expect(result).toEqual([]);
  });

  it("should return keywords that have instances > 0", () => {
    const keywords = [
      {
        displayName: "Keyword 3",
        instances: 0,
        proficient: true,
        aliases: ["kw3", "k3", "word3"],
      },
      {
        displayName: "Keyword 4",
        instances: 1,
        proficient: true,
        aliases: ["kw4", "k4", "word4"],
      },
      {
        displayName: "Keyword 5",
        instances: 2,
        proficient: false,
        aliases: ["kw5", "k5", "word5"],
      },
      {
        displayName: "Keyword 6",
        instances: 3,
        proficient: true,
        aliases: ["kw6", "k6", "word6"],
      },
    ];

    const result = getInstancedKeywords(keywords);

    // Keywords 4, 5, and 6 have instances > 0
    const expectedKeywords = [
      {
        displayName: "Keyword 4",
        instances: 1,
        proficient: true,
        aliases: ["kw4", "k4", "word4"],
      },
      {
        displayName: "Keyword 5",
        instances: 2,
        proficient: false,
        aliases: ["kw5", "k5", "word5"],
      },
      {
        displayName: "Keyword 6",
        instances: 3,
        proficient: true,
        aliases: ["kw6", "k6", "word6"],
      },
    ];

    expect(result).toEqual(expectedKeywords);
  });
});

describe("getMatches", () => {
  it("should return null when the input text is empty", () => {
    const textToMatch = "";
    const wordsToMatch = ["keyword1", "keyword2", "keyword3"];
    const result = getMatches(textToMatch, wordsToMatch);
    expect(result).toEqual(null);
  });

  it("should return null when no matches are found", () => {
    const textToMatch = "This is a sample text.";
    const wordsToMatch = ["keyword1", "keyword2", "keyword3"];
    const result = getMatches(textToMatch, wordsToMatch);
    expect(result).toEqual(null);
  });

  it("should return an array of matching words", () => {
    const textToMatch = "This is a sample text with keyword1 and keyword2.";
    const wordsToMatch = ["keyword1", "keyword2", "keyword3"];
    const result = getMatches(textToMatch, wordsToMatch);
    const expectedMatches = ["keyword1", "keyword2"];
    expect(result).toEqual(expectedMatches);
  });

  it("should return an array of matching words, ignoring case sensitivity", () => {
    const textToMatch = "This is a sample text with Keyword1 and Keyword2.";
    const wordsToMatch = ["keyword1", "keyword2", "keyword3"];
    const result = getMatches(textToMatch, wordsToMatch);
    const expectedMatches = ["Keyword1", "Keyword2"];
    expect(result).toEqual(expectedMatches);
  });

  it("should return an array of matching words with duplicates", () => {
    const textToMatch = "Keyword1 is repeated twice in this text. Keyword1";
    const wordsToMatch = ["keyword1"];
    const result = getMatches(textToMatch, wordsToMatch);
    const expectedMatches = ["Keyword1", "Keyword1"];
    expect(result).toEqual(expectedMatches);
  });
});

describe("getUniqueMatches", () => {
  it("should return an empty array when the input text is empty", () => {
    const textToMatch = "";
    const wordsToMatch = ["keyword1", "keyword2", "keyword3"];
    const result = getUniqueMatches(textToMatch, wordsToMatch);
    expect(result).toEqual([]);
  });

  it("should return an empty array when no matches are found", () => {
    const textToMatch = "This is a sample text.";
    const wordsToMatch = ["keyword1", "keyword2", "keyword3"];
    const result = getUniqueMatches(textToMatch, wordsToMatch);
    expect(result).toEqual([]);
  });

  it("should return an array of matching words", () => {
    const textToMatch = "This is a sample text with keyword1 and keyword2.";
    const wordsToMatch = ["keyword1", "keyword2", "keyword3"];
    const result = getUniqueMatches(textToMatch, wordsToMatch);
    const expectedMatches = ["keyword1", "keyword2"];
    expect(result).toEqual(expectedMatches);
  });

  it("should return an array of unique matching words with duplicates removed", () => {
    const textToMatch = "This is a sample text with Keyword1 and Keyword2 and Keyword1 and Keyword2.";
    const wordsToMatch = ["keyword1", "keyword2", "keyword3"];
    const result = getUniqueMatches(textToMatch, wordsToMatch);
    const expectedMatches = ["keyword1", "keyword2"];
    expect(result).toEqual(expectedMatches);
  });

  it("should return an array of unique matching words, with the words being the same case as the wordsToMatch", () => {
    const textToMatch = "keyword1 is KeYwORd2 which is KEYWORD3.";
    const wordsToMatch = ["Keyword1", "keyword2", "keyWord3"];
    const result = getUniqueMatches(textToMatch, wordsToMatch);
    const expectedMatches = ["Keyword1", "keyword2", "keyWord3"];
    expect(result).toEqual(expectedMatches);
  });

  it("should return an array of unique matching words, ignoring case sensitivity between the text to match and words to match.", () => {
    const textToMatch = "Keyword1 is repeated twice in this text.";
    const wordsToMatch = ["keyword1"];
    const result = getUniqueMatches(textToMatch, wordsToMatch);
    const expectedMatches = ["keyword1"];
    expect(result).toEqual(expectedMatches);
  });
});
