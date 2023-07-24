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
        title: "elit nostrud",
        positions: [
          {
            id: 1,
            title: "ipsum aliqua",
            subTitle: "cillum excepteur excepteur",
            startDate: new Date(2000),
            endDate: new Date(2001),
            resumeSectionTitle: "labore",
            bullets: [
              {
                id: 1,
                point: "Ipsum esse labore aute pariatur culpa est eu ut excepteur pariatur veniam magna commodo amet.",
                default: false,
                fill: false,
                positionId: 1,
                required: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "sint",
                        keywordDisplayName: "in",
                      },
                      {
                        id: 1,
                        alias: "laborum",
                        keywordDisplayName: "veniam",
                      },
                      {
                        id: 1,
                        alias: "et",
                        keywordDisplayName: "laborum",
                      },
                    ],
                    displayName: "elit",
                    proficient: false,
                    keywordsTitle: "anim",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point: "Tempor consectetur eiusmod laboris et fugiat commodo reprehenderit tempor minim sit nulla minim.",
                default: true,
                fill: true,
                positionId: 1,
                required: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "Lorem",
                        keywordDisplayName: "culpa",
                      },
                      {
                        id: 1,
                        alias: "ad",
                        keywordDisplayName: "fugiat",
                      },
                    ],
                    displayName: "velit",
                    proficient: true,
                    keywordsTitle: "excepteur",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point: "Laborum tempor mollit velit irure occaecat est mollit sunt.",
                default: false,
                fill: true,
                positionId: 1,
                required: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "amet",
                        keywordDisplayName: "qui",
                      },
                      {
                        id: 1,
                        alias: "magna",
                        keywordDisplayName: "elit",
                      },
                      {
                        id: 1,
                        alias: "laborum",
                        keywordDisplayName: "esse",
                      },
                    ],
                    displayName: "incididunt",
                    proficient: false,
                    keywordsTitle: "ullamco",
                    bulletId: 1,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "proident fugiat",
        positions: [
          {
            id: 1,
            title: "deserunt nisi",
            subTitle: "amet deserunt in",
            startDate: new Date(2000),
            endDate: new Date(2001),
            resumeSectionTitle: "nulla",
            bullets: [
              {
                id: 1,
                point: "Veniam eiusmod duis consequat sunt deserunt et.",
                default: false,
                fill: true,
                positionId: 1,
                required: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "ut",
                        keywordDisplayName: "adipisicing",
                      },
                    ],
                    displayName: "est",
                    proficient: true,
                    keywordsTitle: "irure",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point:
                  "Consectetur dolor reprehenderit ipsum aliquip aliqua consectetur laborum deserunt aliqua ullamco nisi Lorem enim.",
                default: false,
                fill: false,
                positionId: 1,
                required: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "pariatur",
                        keywordDisplayName: "eiusmod",
                      },
                    ],
                    displayName: "qui",
                    proficient: false,
                    keywordsTitle: "veniam",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point: "Sint nostrud nisi Lorem veniam fugiat commodo ipsum voluptate velit dolor occaecat ut ex laborum.",
                default: true,
                fill: true,
                positionId: 1,
                required: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "culpa",
                        keywordDisplayName: "pariatur",
                      },
                      {
                        id: 1,
                        alias: "ex",
                        keywordDisplayName: "dolor",
                      },
                    ],
                    displayName: "veniam",
                    proficient: false,
                    keywordsTitle: "pariatur",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point: "Et eu exercitation amet dolor velit non qui officia velit laboris mollit.",
                default: true,
                fill: true,
                positionId: 1,
                required: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "mollit",
                        keywordDisplayName: "id",
                      },
                      {
                        id: 1,
                        alias: "aute",
                        keywordDisplayName: "in",
                      },
                    ],
                    displayName: "culpa",
                    proficient: false,
                    keywordsTitle: "ut",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point: "Laboris in aliqua deserunt esse irure velit anim velit in reprehenderit aliqua qui eiusmod ipsum.",
                default: true,
                fill: true,
                positionId: 1,
                required: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "fugiat",
                        keywordDisplayName: "pariatur",
                      },
                    ],
                    displayName: "ut",
                    proficient: false,
                    keywordsTitle: "dolor",
                    bulletId: 1,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "nisi in",
        positions: [
          {
            id: 1,
            title: "exercitation anim",
            subTitle: "dolore aliqua id",
            startDate: new Date(2000),
            endDate: new Date(2001),
            resumeSectionTitle: "voluptate",
            bullets: [
              {
                id: 1,
                point: "Dolore eu eu id quis exercitation eu aliqua dolore esse.",
                default: false,
                fill: true,
                positionId: 1,
                required: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "in",
                        keywordDisplayName: "pariatur",
                      },
                      {
                        id: 1,
                        alias: "tempor",
                        keywordDisplayName: "consequat",
                      },
                      {
                        id: 1,
                        alias: "deserunt",
                        keywordDisplayName: "qui",
                      },
                    ],
                    displayName: "cillum",
                    proficient: false,
                    keywordsTitle: "eu",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point: "Veniam consectetur reprehenderit irure do.",
                default: false,
                fill: true,
                positionId: 1,
                required: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "incididunt",
                        keywordDisplayName: "ex",
                      },
                    ],
                    displayName: "proident",
                    proficient: false,
                    keywordsTitle: "aute",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point: "Minim enim do qui ex ipsum eu quis consequat nulla veniam mollit sunt.",
                default: true,
                fill: true,
                positionId: 1,
                required: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "quis",
                        keywordDisplayName: "voluptate",
                      },
                      {
                        id: 1,
                        alias: "nisi",
                        keywordDisplayName: "do",
                      },
                      {
                        id: 1,
                        alias: "nostrud",
                        keywordDisplayName: "mollit",
                      },
                    ],
                    displayName: "sunt",
                    proficient: false,
                    keywordsTitle: "proident",
                    bulletId: 1,
                  },
                ],
              },
              {
                id: 1,
                point: "Laboris ad sint nulla Lorem enim ex dolor est aliqua.",
                default: true,
                fill: false,
                positionId: 1,
                required: [
                  {
                    aliases: [
                      {
                        id: 1,
                        alias: "sit",
                        keywordDisplayName: "eu",
                      },
                    ],
                    displayName: "id",
                    proficient: true,
                    keywordsTitle: "magna",
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
