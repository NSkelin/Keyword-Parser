import {createCollectionsWithKeywordsAndAliases, deleteCollections} from "@/database/tableQueries/keywordCollection";
import {getCollectionsAliases} from "./collection";

async function seedDB() {
  const mockData = [
    {
      title: "col1Title",
      highlightColor: "testColor",
      keywords: [
        {
          displayName: "col1Key1Name",
          proficient: true,
          aliases: [
            {
              alias: "col1Key1Alias1",
            },
            {
              alias: "col1Key1Alias2",
            },
            {
              alias: "col1Key1Alias3",
            },
          ],
        },
        {
          displayName: "col1Key2Name",
          proficient: true,
          aliases: [
            {
              alias: "col1Key2Alias1",
            },
            {
              alias: "col1Key2Alias2",
            },
            {
              alias: "col1Key2Alias3",
            },
          ],
        },
      ],
    },
    {
      title: "col2Title",
      highlightColor: "testColor",
      keywords: [
        {
          displayName: "col2Key1Name",
          proficient: true,
          aliases: [
            {
              alias: "col2Key1Alias1",
            },
            {
              alias: "col2Key1Alias2",
            },
            {
              alias: "col2Key1Alias3",
            },
          ],
        },
        {
          displayName: "col2Key2Name",
          proficient: true,
          aliases: [
            {
              alias: "col2Key2Alias1",
            },
            {
              alias: "col2Key2Alias2",
            },
            {
              alias: "col2Key2Alias3",
            },
          ],
        },
      ],
    },
  ];

  await createCollectionsWithKeywordsAndAliases(mockData);
}

async function clearDB() {
  await deleteCollections();
  return;
}

beforeAll(async () => {
  await seedDB();
});

afterAll(async () => {
  await clearDB();
});

describe("getCollectionsAliases", () => {
  describe("ensure the query works with allowed inputs", () => {
    const expectedResult = [
      {
        title: "col1Title",
        highlightColor: "testColor",
        aliases: ["col1Key1Alias1", "col1Key1Alias2", "col1Key1Alias3", "col1Key2Alias1", "col1Key2Alias2", "col1Key2Alias3"],
      },
      {
        title: "col2Title",
        highlightColor: "testColor",
        aliases: ["col2Key1Alias1", "col2Key1Alias2", "col2Key1Alias3", "col2Key2Alias1", "col2Key2Alias2", "col2Key2Alias3"],
      },
    ];

    it("should return the collection with the title sent in", async () => {
      expect(await getCollectionsAliases("col1Title")).toEqual([expectedResult[0]]);
    });

    it("should return all matching collections if an array of strings with correct titles is sent in", async () => {
      expect(await getCollectionsAliases(["col1Title", "col2Title"])).toEqual(expectedResult);
    });

    it("should return all collections when sent nothing", async () => {
      expect(await getCollectionsAliases()).toEqual(expectedResult);
    });

    it("should return all collections when sent an empty array", async () => {
      expect(await getCollectionsAliases([])).toEqual(expectedResult);
    });

    it("should return an empty array when a wrong title is sent in", async () => {
      expect(await getCollectionsAliases("wrong title")).toEqual([]);
    });
  });
});
