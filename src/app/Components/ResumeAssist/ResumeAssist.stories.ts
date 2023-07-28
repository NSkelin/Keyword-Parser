import {Meta, StoryObj} from "@storybook/react";
import ResumeAssist from "./ResumeAssist";
import {enableMapSet} from "immer";
enableMapSet();

const meta: Meta<typeof ResumeAssist> = {
  component: ResumeAssist,
};

export default meta;
type Story = StoryObj<typeof ResumeAssist>;
export const Default: Story = {
  args: {
    sectionData: [
      {
        title: "cillum aliqua",
        positions: [
          {
            id: 1,
            title: "anim est",
            subTitle: "ipsum culpa adipisicing",
            startDate: new Date(1996),
            endDate: new Date(2015),
            resumeSectionTitle: "amet",
            bullets: [
              {
                id: 1,
                point: "Reprehenderit minim ullamco id anim ut.",
                includeByDefault: true,
                fill: true,
                positionId: 1,
                requiredKeywords: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "adipisicing",
                        keywordDisplayName: "cillum",
                      },
                    ],
                    id: 1,
                    displayName: "ea",
                    proficient: false,
                    keywordsTitle: "velit",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point: "Id eu tempor quis consequat.",
                includeByDefault: false,
                fill: false,
                positionId: 1,
                requiredKeywords: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "deserunt",
                        keywordDisplayName: "nisi",
                      },
                    ],
                    id: 1,
                    displayName: "reprehenderit",
                    proficient: true,
                    keywordsTitle: "enim",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point: "Aute irure commodo aliquip eiusmod sunt aute do est sunt nisi mollit.",
                includeByDefault: true,
                fill: true,
                positionId: 1,
                requiredKeywords: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "exercitation",
                        keywordDisplayName: "ipsum",
                      },
                    ],
                    id: 1,
                    displayName: "velit",
                    proficient: true,
                    keywordsTitle: "fugiat",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point: "Non mollit incididunt deserunt non anim aute nostrud veniam.",
                includeByDefault: true,
                fill: false,
                positionId: 1,
                requiredKeywords: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "aute",
                        keywordDisplayName: "commodo",
                      },
                      {
                        id: 1,
                        alias: "magna",
                        keywordDisplayName: "in",
                      },
                      {
                        id: 1,
                        alias: "eu",
                        keywordDisplayName: "fugiat",
                      },
                    ],
                    id: 1,
                    displayName: "consequat",
                    proficient: false,
                    keywordsTitle: "cillum",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point: "Est aliquip magna eiusmod esse incididunt.",
                includeByDefault: true,
                fill: true,
                positionId: 1,
                requiredKeywords: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "consectetur",
                        keywordDisplayName: "consequat",
                      },
                    ],
                    id: 1,
                    displayName: "mollit",
                    proficient: false,
                    keywordsTitle: "veniam",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point: "Nulla cillum voluptate ullamco ea consectetur cupidatat amet et exercitation ipsum.",
                includeByDefault: false,
                fill: false,
                positionId: 1,
                requiredKeywords: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "consequat",
                        keywordDisplayName: "incididunt",
                      },
                    ],
                    id: 1,
                    displayName: "amet",
                    proficient: true,
                    keywordsTitle: "sint",
                    bulletId: 1,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "in mollit",
        positions: [
          {
            id: 1,
            title: "excepteur consequat",
            subTitle: "aute dolore amet",
            startDate: new Date(1976),
            endDate: new Date(2000),
            resumeSectionTitle: "et",
            bullets: [
              {
                id: 1,
                point: "Do fugiat incididunt labore aliqua id dolore elit do in consequat minim fugiat minim ullamco.",
                includeByDefault: false,
                fill: true,
                positionId: 1,
                requiredKeywords: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "pariatur",
                        keywordDisplayName: "excepteur",
                      },
                      {
                        id: 1,
                        alias: "labore",
                        keywordDisplayName: "commodo",
                      },
                    ],
                    id: 1,
                    displayName: "consectetur",
                    proficient: true,
                    keywordsTitle: "esse",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point: "Tempor esse et elit magna ullamco quis exercitation adipisicing elit esse est.",
                includeByDefault: false,
                fill: true,
                positionId: 1,
                requiredKeywords: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "exercitation",
                        keywordDisplayName: "qui",
                      },
                      {
                        id: 1,
                        alias: "eiusmod",
                        keywordDisplayName: "sunt",
                      },
                    ],
                    id: 1,
                    displayName: "magna",
                    proficient: true,
                    keywordsTitle: "cillum",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point: "Nisi proident do Lorem sint ad proident elit ullamco sint.",
                includeByDefault: false,
                fill: true,
                positionId: 1,
                requiredKeywords: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "nisi",
                        keywordDisplayName: "ullamco",
                      },
                    ],
                    id: 1,
                    displayName: "dolore",
                    proficient: false,
                    keywordsTitle: "minim",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point: "In sit pariatur consectetur ullamco proident ipsum et consectetur.",
                includeByDefault: true,
                fill: false,
                positionId: 1,
                requiredKeywords: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "laboris",
                        keywordDisplayName: "aliquip",
                      },
                      {
                        id: 1,
                        alias: "sint",
                        keywordDisplayName: "aliquip",
                      },
                      {
                        id: 1,
                        alias: "id",
                        keywordDisplayName: "do",
                      },
                    ],
                    id: 1,
                    displayName: "qui",
                    proficient: false,
                    keywordsTitle: "minim",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point: "Culpa aute adipisicing tempor tempor esse tempor irure consectetur elit do sit veniam Lorem.",
                includeByDefault: false,
                fill: true,
                positionId: 1,
                requiredKeywords: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "pariatur",
                        keywordDisplayName: "exercitation",
                      },
                    ],
                    id: 1,
                    displayName: "enim",
                    proficient: false,
                    keywordsTitle: "cillum",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point: "Irure esse commodo deserunt reprehenderit officia in consectetur laborum esse anim in.",
                includeByDefault: false,
                fill: false,
                positionId: 1,
                requiredKeywords: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "dolore",
                        keywordDisplayName: "consequat",
                      },
                    ],
                    id: 1,
                    displayName: "fugiat",
                    proficient: true,
                    keywordsTitle: "cillum",
                    bulletId: 1,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "proident occaecat",
        positions: [
          {
            id: 1,
            title: "excepteur adipisicing",
            subTitle: "tempor nisi deserunt",
            startDate: new Date(1970),
            endDate: new Date(1975),
            resumeSectionTitle: "ex",
            bullets: [
              {
                id: 1,
                point: "Cupidatat eu reprehenderit non veniam labore et nulla est labore consectetur enim.",
                includeByDefault: true,
                fill: true,
                positionId: 1,
                requiredKeywords: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "laborum",
                        keywordDisplayName: "duis",
                      },
                      {
                        id: 1,
                        alias: "elit",
                        keywordDisplayName: "est",
                      },
                    ],
                    id: 1,
                    displayName: "sit",
                    proficient: true,
                    keywordsTitle: "pariatur",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point: "Exercitation et dolore pariatur aliqua anim.",
                includeByDefault: false,
                fill: false,
                positionId: 1,
                requiredKeywords: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "non",
                        keywordDisplayName: "sint",
                      },
                      {
                        id: 1,
                        alias: "excepteur",
                        keywordDisplayName: "reprehenderit",
                      },
                    ],
                    id: 1,
                    displayName: "labore",
                    proficient: false,
                    keywordsTitle: "pariatur",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point: "Elit mollit esse occaecat nulla ut dolor anim nisi esse veniam eu elit irure veniam.",
                includeByDefault: false,
                fill: true,
                positionId: 1,
                requiredKeywords: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "do",
                        keywordDisplayName: "culpa",
                      },
                    ],
                    id: 1,
                    displayName: "fugiat",
                    proficient: false,
                    keywordsTitle: "irure",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point: "Minim ex amet dolore nisi ad exercitation voluptate Lorem sit.",
                includeByDefault: true,
                fill: false,
                positionId: 1,
                requiredKeywords: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "incididunt",
                        keywordDisplayName: "culpa",
                      },
                      {
                        id: 1,
                        alias: "aliqua",
                        keywordDisplayName: "dolor",
                      },
                    ],
                    id: 1,
                    displayName: "Lorem",
                    proficient: false,
                    keywordsTitle: "ullamco",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point: "Fugiat esse consequat in duis eu officia aliqua in in eiusmod excepteur.",
                includeByDefault: true,
                fill: false,
                positionId: 1,
                requiredKeywords: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "nulla",
                        keywordDisplayName: "aliqua",
                      },
                    ],
                    id: 1,
                    displayName: "proident",
                    proficient: true,
                    keywordsTitle: "minim",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point: "Sunt sunt sunt exercitation est officia ullamco culpa aliqua aliqua.",
                includeByDefault: true,
                fill: false,
                positionId: 1,
                requiredKeywords: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "velit",
                        keywordDisplayName: "nulla",
                      },
                    ],
                    id: 1,
                    displayName: "dolor",
                    proficient: false,
                    keywordsTitle: "esse",
                    bulletId: 1,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],

    keywordCollections: [
      {
        title: "Collection 1",
        keywords: [
          {
            displayName: "culpa",
            instances: 3,
            proficient: true,
            aliases: ["mollit"],
          },
          {
            displayName: "id",
            instances: 0,
            proficient: false,
            aliases: ["id"],
          },
          {
            displayName: "elit",
            instances: 2,
            proficient: true,
            aliases: ["deserunt"],
          },
          {
            displayName: "ex",
            instances: 0,
            proficient: true,
            aliases: ["irure"],
          },
          {
            displayName: "magna",
            instances: 2,
            proficient: false,
            aliases: ["Lorem"],
          },
          {
            displayName: "aliquip",
            instances: 2,
            proficient: true,
            aliases: ["fugiat"],
          },
          {
            displayName: "enim",
            instances: 3,
            proficient: true,
            aliases: ["laboris"],
          },
          {
            displayName: "occaecat",
            instances: 0,
            proficient: true,
            aliases: ["amet"],
          },
          {
            displayName: "nulla",
            instances: 3,
            proficient: true,
            aliases: ["nisi"],
          },
          {
            displayName: "do",
            instances: 1,
            proficient: true,
            aliases: ["ut"],
          },
        ],
      },
      {
        title: "Collection 2",
        keywords: [
          {
            displayName: "culpa",
            instances: 3,
            proficient: true,
            aliases: ["mollit"],
          },
          {
            displayName: "id",
            instances: 0,
            proficient: false,
            aliases: ["id"],
          },
          {
            displayName: "elit",
            instances: 2,
            proficient: true,
            aliases: ["deserunt"],
          },
          {
            displayName: "ex",
            instances: 0,
            proficient: true,
            aliases: ["irure"],
          },
          {
            displayName: "magna",
            instances: 2,
            proficient: false,
            aliases: ["Lorem"],
          },
          {
            displayName: "aliquip",
            instances: 2,
            proficient: true,
            aliases: ["fugiat"],
          },
          {
            displayName: "enim",
            instances: 3,
            proficient: true,
            aliases: ["laboris"],
          },
          {
            displayName: "occaecat",
            instances: 0,
            proficient: true,
            aliases: ["amet"],
          },
          {
            displayName: "nulla",
            instances: 3,
            proficient: true,
            aliases: ["nisi"],
          },
          {
            displayName: "do",
            instances: 1,
            proficient: true,
            aliases: ["ut"],
          },
        ],
      },
    ],
  },
};
