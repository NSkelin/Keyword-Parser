import prisma from "@/database/client";
import {createCollectionsWithKeywordsAndAliases, deleteCollections} from "@/database/tableQueries/keywordCollection";
import {
  createCollections,
  getCollectionsAliases,
  getCollectionsKeywords,
  getCollectionsWithKeywordsAndAliases,
} from "./collection";
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

describe("getCollectionKeywords", () => {
  const expectedResult = [
    {
      title: "col1Title",
      highlightColor: "testColor",
      keywords: [
        {
          displayName: "col1Key1Name",
          proficient: true,
          aliases: ["col1Key1Alias1", "col1Key1Alias2", "col1Key1Alias3"],
        },
        {
          displayName: "col1Key2Name",
          proficient: true,
          aliases: ["col1Key2Alias1", "col1Key2Alias2", "col1Key2Alias3"],
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
          aliases: ["col2Key1Alias1", "col2Key1Alias2", "col2Key1Alias3"],
        },
        {
          displayName: "col2Key2Name",
          proficient: true,
          aliases: ["col2Key2Alias1", "col2Key2Alias2", "col2Key2Alias3"],
        },
      ],
    },
  ];

  it("should return a formatted array of data", async () => {
    // remove the id parameter from the result since its different every time because the db is persistent and auto increments.
    const data = (await getCollectionsKeywords()).map(({keywords, ...rest}) => {
      const idLessKeywords = keywords.map(({id: _id, ...rest}) => {
        return {...rest};
      });
      return {keywords: idLessKeywords, ...rest};
    });
    expect(data).toEqual(expectedResult);
  });
});

describe("createCollectionsWithKeywordsAndAliases", () => {
  const mockData = [
    {
      title: "createCollectionTestTitle1",
      highlightColor: "createCollectionColor1",
      keywords: [
        {
          displayName: "createCollectionDisplayname1",
          proficient: false,
          aliases: [
            {
              alias: "createCollectionAlias1",
            },
          ],
        },
      ],
    },
    {
      title: "createCollectionTestTitle2",
      highlightColor: "createCollectionColor2",
      keywords: [
        {
          displayName: "createCollectionDisplayname2",
          proficient: false,
          aliases: [
            {
              alias: "createCollectionAlias2",
            },
          ],
        },
      ],
    },
  ];

  it("should return a data structure containing the newly created data", async () => {
    expect(await createCollectionsWithKeywordsAndAliases(mockData)).toMatchObject(mockData);
  });

  it("should create one nested collection", async () => {
    await createCollectionsWithKeywordsAndAliases([mockData[0]]);

    const DBCollection = await getCollectionsWithKeywordsAndAliases([mockData[0].title]);
    expect(DBCollection).toMatchObject([mockData[0]]);
  });

  it("should create multiple nested collections", async () => {
    await createCollectionsWithKeywordsAndAliases(mockData);
    const collectionTitles = mockData.map((e) => e.title);
    const DBCollections = await getCollectionsWithKeywordsAndAliases(collectionTitles);
    expect(DBCollections).toMatchObject(mockData);
  });
});

describe("getCollectionsWithKeywordsAndAliases", () => {
  it("should return one nested collection", async () => {
    const nestedCollection = await getCollectionsWithKeywordsAndAliases([DBSeedData[0].title]);
    expect(nestedCollection).toMatchObject([DBSeedData[0]]);
  });

  it("should return multiple nested collections", async () => {
    const collectionTitles = DBSeedData.map((e) => e.title);
    const nestedCollection = await getCollectionsWithKeywordsAndAliases(collectionTitles);
    expect(nestedCollection).toMatchObject(DBSeedData);
  });
});

describe("deleteCollections", () => {
  it("should delete all collections and their many-to-one relations (keyword, keywordAlias)", async () => {
    expect(await prisma.keywordCollection.findFirst()).not.toBeNull();
    expect(await prisma.keyword.findFirst()).not.toBeNull();
    expect(await prisma.keywordAlias.findFirst()).not.toBeNull();

    await deleteCollections();

    expect(await prisma.keywordCollection.findFirst()).toBeNull();
    expect(await prisma.keyword.findFirst()).toBeNull();
    expect(await prisma.keywordAlias.findFirst()).toBeNull();
  });

  // no functions to add bullets as its not implemented yet.
  it.todo("should not delete optional relations (many-to-many, one-to-many)");
});

describe("createCollections", () => {
  it("should create 1 collection", async () => {
    const collectiontitle = "newCollection";

    expect(await prisma.keywordCollection.findFirst({where: {title: collectiontitle}})).toBeNull();

    await createCollections([{title: collectiontitle, highlightColor: "FFFFFF"}]);

    expect(await prisma.keywordCollection.findFirst({where: {title: collectiontitle}})).not.toBeNull();
  });

  it("should create multiple collections", async () => {
    expect(await prisma.keywordCollection.findFirst({where: {title: "newCollection1"}})).toBeNull();
    expect(await prisma.keywordCollection.findFirst({where: {title: "newCollection2"}})).toBeNull();

    await createCollections([{title: "newCollection1", highlightColor: "FFFFFF"}]);
    await createCollections([{title: "newCollection2", highlightColor: "FFFFFF"}]);

    expect(await prisma.keywordCollection.findFirst({where: {title: "newCollection1"}})).not.toBeNull();
    expect(await prisma.keywordCollection.findFirst({where: {title: "newCollection2"}})).not.toBeNull();
  });
});
