import {expect} from "@jest/globals";
import {prismaMock} from "../clientMock";
import {getCollectionsAliases} from "./collection";

describe("getCollectionsAliases", () => {
  const mockResponse = [
    {
      title: "Languages",
      highlightColor: "#a3daff",
      keywords: [
        {aliases: [{alias: "html"}, {alias: "html5"}]},
        {aliases: [{alias: "css"}, {alias: "css3"}]},
        {aliases: [{alias: "javascript"}, {alias: "js"}]},
        {aliases: [{alias: "typescript"}]},
        {aliases: [{alias: "python"}]},
        {aliases: [{alias: "c++"}, {alias: "cplusplus"}]},
        {aliases: [{alias: "c#"}]},
        {aliases: [{alias: "java"}]},
      ],
    },
    {
      title: "Other",
      highlightColor: "#95f263",
      keywords: [
        {aliases: [{alias: "api"}]},
        {aliases: [{alias: "seo"}]},
        {
          aliases: [{alias: "ui"}, {alias: "ux"}, {alias: "ui/ux"}],
        },
        {aliases: [{alias: "agile"}]},
        {aliases: [{alias: "devops"}]},
        {aliases: [{alias: "version control"}]},
        {aliases: [{alias: "database"}]},
        {aliases: [{alias: "testing"}]},
        {aliases: [{alias: "sql"}]},
      ],
    },
  ];
  const expectedFormattedData = [
    {
      title: "Languages",
      highlightColor: "#a3daff",
      aliases: ["html", "html5", "css", "css3", "javascript", "js", "typescript", "python", "c++", "cplusplus", "c#", "java"],
    },
    {
      title: "Other",
      highlightColor: "#95f263",
      aliases: ["api", "seo", "ui", "ux", "ui/ux", "agile", "devops", "version control", "database", "testing", "sql"],
    },
  ];
  it("should return in the correct format", async () => {
    prismaMock.keywordCollection.findMany.mockResolvedValue([mockResponse[0]]);
    expect(await getCollectionsAliases("Languages")).toEqual([expectedFormattedData[0]]);

    prismaMock.keywordCollection.findMany.mockResolvedValue([mockResponse[1]]);
    expect(await getCollectionsAliases("Languages")).toEqual([expectedFormattedData[1]]);

    prismaMock.keywordCollection.findMany.mockResolvedValue(mockResponse);
    expect(await getCollectionsAliases("Languages")).toEqual(expectedFormattedData);
  });

  it("should return a formatted response when provided with a string", async () => {
    prismaMock.keywordCollection.findMany.mockResolvedValue(mockResponse);

    expect(await getCollectionsAliases("Languages")).toEqual(expectedFormattedData);
  });

  it("should return a formatted response when provided with an array of strings", async () => {
    prismaMock.keywordCollection.findMany.mockResolvedValue(mockResponse);
    expect(await getCollectionsAliases(["Languages", "Other", "Battle"])).toEqual(expectedFormattedData);
  });

  it("should return a formatted response when provided with nothing", async () => {
    prismaMock.keywordCollection.findMany.mockResolvedValue(mockResponse);
    expect(await getCollectionsAliases()).toEqual(expectedFormattedData);
  });

  it("should return a formatted response when provided with an empty array", async () => {
    prismaMock.keywordCollection.findMany.mockResolvedValue(mockResponse);
    expect(await getCollectionsAliases([])).toEqual(expectedFormattedData);
  });
});
