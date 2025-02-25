import prisma from "@/database/client";
import {createCollectionsWithKeywordsAndAliases, deleteAllCollections} from "@/database/tableQueries/keywordCollection";
import {
  createCollections,
  deleteCollection,
  getCollectionsAliases,
  getCollectionsKeywords,
  getCollectionsWithKeywordsAndAliases,
  updateCollection,
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
  await deleteAllCollections();
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

describe("deleteAllCollections", () => {
  it("should delete all collections and their many-to-one relations (keyword, keywordAlias)", async () => {
    expect(await prisma.keywordCollection.findFirst()).not.toBeNull();
    expect(await prisma.keyword.findFirst()).not.toBeNull();
    expect(await prisma.keywordAlias.findFirst()).not.toBeNull();

    await deleteAllCollections();

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

  it("should return an error if the new collection already exists", async () => {
    const existingCollection = DBSeedData[0].title;
    const {success, data, error} = await createCollections([{title: existingCollection, highlightColor: "FFFFFF"}]);

    expect(success).toBeFalsy();
    expect(data).toBeUndefined();
    expect(error).toBeDefined();
  });

  it("should return an error if any of the new collections already exists", async () => {
    const newCollections = ["newtitle1", DBSeedData[0].title, "newtitle2"];
    const {success, data, error} = await createCollections([
      {title: newCollections[0], highlightColor: "FFFFFF"},
      {title: newCollections[1], highlightColor: "FFFFFF"},
      {title: newCollections[2], highlightColor: "FFFFFF"},
    ]);

    expect(success).toBeFalsy();
    expect(data).toBeUndefined();
    expect(error).toBeDefined();
  });

  it("should not create any collections if one fails to create", async () => {
    const newCollections = ["newtitle1", DBSeedData[0].title, "newtitle2"];
    await createCollections([
      {title: newCollections[0], highlightColor: "FFFFFF"},
      {title: newCollections[1], highlightColor: "FFFFFF"},
      {title: newCollections[2], highlightColor: "FFFFFF"},
    ]);

    expect(await prisma.keywordCollection.findFirst({where: {title: newCollections[0]}})).toBeNull();
    expect(await prisma.keywordCollection.findFirst({where: {title: newCollections[2]}})).toBeNull();
  });

  it("should return an object with the count of created collections and a success bool = true on success", async () => {
    const {success, data} = await createCollections([{title: "newTitle", highlightColor: "FFFFFF"}]);

    expect(success).toBeTruthy();
    expect(data).toStrictEqual({count: 1});
  });
});

describe("updateCollection", () => {
  it("should update the title and highlightColor", async () => {
    const oldTitle = DBSeedData[0].title;
    const updateData = {
      newTitle: "newCol1Title",
      newHighlightColor: "EEEEEE",
    };

    expect(await prisma.keywordCollection.findFirst({where: {title: oldTitle}})).not.toBeNull();

    await updateCollection(oldTitle, updateData);

    expect(await prisma.keywordCollection.findFirst({where: {title: oldTitle}})).toBeNull();
    const updatedCollection = await prisma.keywordCollection.findFirst({where: {title: updateData.newTitle}});
    expect(updatedCollection?.title).toBe(updateData.newTitle);
    expect(updatedCollection?.highlightColor).toBe(updateData.newHighlightColor);
  });

  it("should update ONLY the title", async () => {
    const oldTitle = DBSeedData[0].title;
    const oldHighlightColor = DBSeedData[0].highlightColor;
    const updateData = {
      newTitle: "newCol1Title",
    };

    expect(await prisma.keywordCollection.findFirst({where: {title: oldTitle}})).not.toBeNull();

    await updateCollection(oldTitle, updateData);

    expect(await prisma.keywordCollection.findFirst({where: {title: oldTitle}})).toBeNull();
    const updatedCollection = await prisma.keywordCollection.findFirst({where: {title: updateData.newTitle}});
    expect(updatedCollection?.title).toBe(updateData.newTitle);
    expect(updatedCollection?.highlightColor).toBe(oldHighlightColor);
  });

  it("should update ONLY the highlightColor", async () => {
    const oldTitle = DBSeedData[0].title;
    const oldHighlightColor = DBSeedData[0].highlightColor;
    const updateData = {
      newHighlightColor: "EEEEEE",
    };

    const oldCollection = await prisma.keywordCollection.findFirst({where: {title: oldTitle}});
    expect(oldCollection?.highlightColor).toBe(oldHighlightColor);

    await updateCollection(oldTitle, updateData);

    const updatedCollection = await prisma.keywordCollection.findFirst({where: {title: oldTitle}});
    expect(updatedCollection?.title).toBe(oldTitle);
    expect(updatedCollection?.highlightColor).toBe(updateData.newHighlightColor);
  });
});

describe("deleteCollection", () => {
  it("should delete the collection and its many-to-one relations (keyword, keywordAlias", async () => {
    expect(await prisma.keywordCollection.findFirst({where: {title: "col1Title"}})).not.toBeNull();
    expect(await prisma.keyword.findFirst({where: {displayName: "col1Key1Name"}})).not.toBeNull();
    expect(await prisma.keywordAlias.findFirst({where: {alias: "col1Key1Alias1"}})).not.toBeNull();
    expect(await prisma.keywordAlias.findFirst({where: {alias: "col1Key1Alias2"}})).not.toBeNull();
    expect(await prisma.keywordAlias.findFirst({where: {alias: "col1Key1Alias3"}})).not.toBeNull();

    await deleteCollection("col1Title");

    expect(await prisma.keywordCollection.findFirst({where: {title: "col1Title"}})).toBeNull();
    expect(await prisma.keyword.findFirst({where: {displayName: "col1Key1Name"}})).toBeNull();
    expect(await prisma.keywordAlias.findFirst({where: {alias: "col1Key1Alias1"}})).toBeNull();
    expect(await prisma.keywordAlias.findFirst({where: {alias: "col1Key1Alias2"}})).toBeNull();
    expect(await prisma.keywordAlias.findFirst({where: {alias: "col1Key1Alias3"}})).toBeNull();
  });

  it("should not delete unrelated collections", async () => {
    await deleteCollection("col1Title");
    await deleteCollection("");

    expect(await prisma.keywordCollection.findFirst({where: {title: "col2Title"}})).not.toBeNull();
  });
});
