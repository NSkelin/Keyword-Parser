import {getCollectionAliases} from "./prisma";
import {prismaMock} from "./clientMock";

// Test case for the getCollectionAliases function
describe("getCollectionAliases", () => {
  const mockData = [
    {
      title: "Collection 1",
      color: "red",
      keywords: [
        {
          displayName: "Keyword 1",
          proficient: true,
          aliases: [
            {id: 1, alias: "Alias 1"},
            {id: 2, alias: "Alias 2"},
          ],
        },
        {
          displayName: "Keyword 2",
          proficient: false,
          aliases: [
            {id: 3, alias: "Alias 3"},
            {id: 4, alias: "Alias 4"},
          ],
        },
      ],
    },
  ];
  test("should return formatted data with aliases when collection titles are provided as an array", async () => {
    prismaMock.keywordCollection.findMany.mockResolvedValue(mockData);

    const result = await getCollectionAliases(["Collection 1"]);

    expect(result).toEqual([
      {
        title: "Collection 1",
        color: "red",
        keywords: ["Alias 1", "Alias 2", "Alias 3", "Alias 4"],
      },
    ]);
  });

  test("should return formatted data with aliases when collection titles are provided as a string", async () => {
    prismaMock.keywordCollection.findMany.mockResolvedValue(mockData);

    const result = await getCollectionAliases("Collection 1");

    expect(result).toEqual([
      {
        title: "Collection 1",
        color: "red",
        keywords: ["Alias 1", "Alias 2", "Alias 3", "Alias 4"],
      },
    ]);
  });

  test("should return empty array when no collection titles are provided", async () => {
    prismaMock.keywordCollection.findMany.mockResolvedValue([]);

    const result = await getCollectionAliases();

    expect(result).toEqual([]);
  });
});
