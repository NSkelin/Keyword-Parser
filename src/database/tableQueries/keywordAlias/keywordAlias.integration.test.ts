import {getKeywordAliases} from ".";
import {createCollectionsWithKeywordsAndAliases, deleteCollections} from "../keywordCollection";

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

describe("getKeywordAliases", () => {
  it("should return the aliases for the given keyword", async () => {
    const aliases = await getKeywordAliases(DBSeedData[0].keywords[0].displayName);
    expect(aliases).toEqual(["col1Key1Alias1", "col1Key1Alias2", "col1Key1Alias3"]);
  });
});
