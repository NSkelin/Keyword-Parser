import {createCollectionsWithKeywordsAndAliases, deleteCollections} from "../keywordCollection";
import {createKeywordAndAliases, deleteKeywordAndAliases, getKeywordWithAliasesByID, updateKeywordAndAliases} from "./keyword";

const DBSeedData = [
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

async function seedDB() {
  await createCollectionsWithKeywordsAndAliases(DBSeedData);
}

async function clearDB() {
  await deleteCollections();
  return;
}

beforeEach(async () => {
  await seedDB();
});

afterEach(async () => {
  await clearDB();
});

describe("getKeywordWithAliasesByID", () => {
  it("should return the correct keyword with its aliases", async () => {
    const mockData = {
      displayName: "testName1",
      proficient: false,
      aliases: [{alias: "testAlias1"}, {alias: "testAlias2"}, {alias: "testAlias3"}],
      collectionTitle: DBSeedData[0].title,
    };

    const newKeywordID = await createKeywordAndAliases(
      mockData.displayName,
      mockData.proficient,
      mockData.aliases,
      mockData.collectionTitle,
    );
    const keyword = await getKeywordWithAliasesByID(newKeywordID);

    expect(keyword).toMatchObject(mockData);
  });
});

describe("createKeywordAndAliases", () => {
  it("should add the keyword to the database", async () => {
    const mockData = {
      displayName: "testName1",
      proficient: false,
      aliases: [{alias: "testAlias1"}, {alias: "testAlias2"}, {alias: "testAlias3"}],
      collectionTitle: DBSeedData[0].title,
    };

    const newKeywordID = await createKeywordAndAliases(
      mockData.displayName,
      mockData.proficient,
      mockData.aliases,
      mockData.collectionTitle,
    );
    const keyword = await getKeywordWithAliasesByID(newKeywordID);

    expect(keyword).toMatchObject(mockData);
  });
});

describe("updateKeywordAndAliases", () => {
  it("should update the keyword in the database", async () => {
    const mockData = {
      displayName: "testName1",
      proficient: false,
      aliases: [{alias: "testAlias1"}, {alias: "testAlias2"}, {alias: "testAlias3"}],
      collectionTitle: DBSeedData[0].title,
    };
    const expectedData = {
      displayName: "newDisplayName1",
      proficient: true,
      aliases: [{alias: "newAlias1"}, {alias: "newAlias2"}],
      collectionTitle: DBSeedData[0].title,
    };

    const newKeywordID = await createKeywordAndAliases(
      mockData.displayName,
      mockData.proficient,
      mockData.aliases,
      mockData.collectionTitle,
    );

    await updateKeywordAndAliases(newKeywordID, true, ["newAlias1", "newAlias2"], "newDisplayName1");
    const keyword = await getKeywordWithAliasesByID(newKeywordID);

    expect(keyword).toMatchObject(expectedData);
  });

  it("should reject to an error if the keyword to update doesnt exist.", async () => {
    await expect(() => {
      return updateKeywordAndAliases(-1, true, ["newAlias1"], "newDisplayname1");
    }).rejects.toThrow();
  });
});

describe("deleteKeywordAndAliases", () => {
  it("should delete the keyword and its aliases", async () => {
    const mockData = {
      displayName: "testName1",
      proficient: false,
      aliases: [{alias: "testAlias1"}, {alias: "testAlias2"}, {alias: "testAlias3"}],
      collectionTitle: DBSeedData[0].title,
    };

    const newKeywordID = await createKeywordAndAliases(
      mockData.displayName,
      mockData.proficient,
      mockData.aliases,
      mockData.collectionTitle,
    );

    expect(await getKeywordWithAliasesByID(newKeywordID)).not.toBeNull();

    await deleteKeywordAndAliases(newKeywordID);

    expect(await getKeywordWithAliasesByID(newKeywordID)).toBeNull();
  });
});
