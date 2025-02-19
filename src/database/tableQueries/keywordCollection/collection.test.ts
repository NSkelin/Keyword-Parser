import {prismaMock} from "@/database/clientMock";
import {expect} from "@jest/globals";
import {Prisma} from "@prisma/client";
import {createCollections, getCollectionsAliases} from "./collection";

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

  describe("ensure the function does works as expected with the allowed inputs", () => {
    it("should return a result when provided with a string", () => {
      prismaMock.keywordCollection.findMany.mockResolvedValue(mockResponse);

      expect(async () => {
        const result = await getCollectionsAliases("Languages");
        expect(result).toBeDefined();
      }).not.toThrow();
    });

    it("should return a result when provided with an array of strings", () => {
      prismaMock.keywordCollection.findMany.mockResolvedValue(mockResponse);

      expect(async () => {
        const result = await getCollectionsAliases(["Languages", "Other", "Battle"]);
        expect(result).toBeDefined();
      }).not.toThrow();
    });

    it("should return a result when provided with nothing", () => {
      prismaMock.keywordCollection.findMany.mockResolvedValue(mockResponse);

      expect(async () => {
        const result = await getCollectionsAliases();
        expect(result).toBeDefined();
      }).not.toThrow();
    });
  });

  it("should return a formatted response when provided with an empty array", async () => {
    prismaMock.keywordCollection.findMany.mockResolvedValue(mockResponse);
    expect(await getCollectionsAliases([])).toEqual(expectedFormattedData);
  });
});

describe("createCollections", () => {
  it("should return an error when PrismaClientKnownRequestError is thrown", async () => {
    const error = new Prisma.PrismaClientKnownRequestError("Test error", {
      code: "P2002",
      clientVersion: "4.0.0",
      meta: {target: ["title"]},
    });
    prismaMock.keywordCollection.createMany.mockRejectedValue(error);

    const result = await createCollections([{title: "Test Collection", highlightColor: "#FF0000"}]);

    expect(result.success).toBe(false);
    expect(result.error).toEqual({
      code: "P2002",
      message: "Test error",
      meta: {target: ["title"]},
    });
  });

  it("should throw an unexpected error if it's not a PrismaClientKnownRequestError", async () => {
    const unexpectedError = new Error("Unexpected error");
    prismaMock.keywordCollection.createMany.mockRejectedValue(unexpectedError);

    await expect(createCollections([{title: "Test Collection", highlightColor: "#FF0000"}])).rejects.toThrow("Unexpected error");
  });
});
