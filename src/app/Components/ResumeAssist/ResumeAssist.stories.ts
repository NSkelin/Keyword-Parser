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
        title: "Education",
        positions: [
          {
            id: 1,
            title: "ad",
            subTitle: "Zoinage",
            startDate: new Date(2013),
            endDate: new Date(2018),
            bullets: [
              {
                id: 0,
                point: "Magna do eiusmod minim Lorem.",
                required: false,
                fill: false,
                restrictions: [
                  {
                    id: 1,
                    restriction: "",
                    bulletId: null,
                  },
                ],
                positionId: null,
              },
              {
                id: 0,
                point: "Magna do eiusmod minim Lorem.",
                required: false,
                fill: false,
                restrictions: [],
                positionId: null,
              },
              {
                id: 1,
                point: "Occaecat quis est cillum eiusmod duis non quis dolore fugiat.",
                required: false,
                fill: false,
                restrictions: [],
                positionId: null,
              },
              {
                id: 2,
                point: "Et laborum irure anim Lorem sunt.",
                required: false,
                fill: false,
                restrictions: [],
                positionId: null,
              },
              {
                id: 3,
                point: "Exercitation sunt laboris minim aliquip sint.",
                required: false,
                fill: false,
                restrictions: [],
                positionId: null,
              },
              {
                id: 4,
                point: "Incididunt adipisicing et exercitation commodo id sint consequat aute.",
                required: false,
                fill: false,
                restrictions: [],
                positionId: null,
              },
              {
                id: 5,
                point: "In commodo ea adipisicing nulla ullamco anim minim dolore officia et magna officia.",
                required: false,
                fill: false,
                restrictions: [],
                positionId: null,
              },
              {
                id: 6,
                point: "Ex eu in laboris cupidatat amet magna nulla pariatur ea sint mollit.",
                required: false,
                fill: false,
                restrictions: [],
                positionId: null,
              },
              {
                id: 7,
                point:
                  "Irure reprehenderit dolor excepteur voluptate exercitation cupidatat minim excepteur nostrud pariatur ad.",
                required: false,
                fill: false,
                restrictions: [],
                positionId: null,
              },
              {
                id: 8,
                point: "Non ad reprehenderit laboris Lorem commodo et qui ullamco tempor.",
                required: false,
                fill: false,
                restrictions: [],
                positionId: null,
              },
              {
                id: 9,
                point: "Do nostrud ea culpa exercitation.",
                required: false,
                fill: false,
                restrictions: [],
                positionId: null,
              },
            ],
            resumeSectionTitle: "",
          },
        ],
      },
      {
        title: "Work Experience",
        positions: [
          {
            id: 1,
            title: "cillum",
            subTitle: "Newcube",
            startDate: new Date(2015),
            endDate: new Date(2018),
            bullets: [
              {
                id: 0,
                point: "Magna do eiusmod minim Lorem.",
                required: false,
                fill: false,
                restrictions: [
                  {
                    id: 1,
                    restriction: "",
                    bulletId: null,
                  },
                ],
                positionId: null,
              },
              {
                id: 0,
                point: "Magna do eiusmod minim Lorem.",
                required: false,
                fill: false,
                restrictions: [],
                positionId: null,
              },
              {
                id: 1,
                point: "Occaecat quis est cillum eiusmod duis non quis dolore fugiat.",
                required: false,
                fill: false,
                restrictions: [],
                positionId: null,
              },
              {
                id: 2,
                point: "Et laborum irure anim Lorem sunt.",
                required: false,
                fill: false,
                restrictions: [],
                positionId: null,
              },
              {
                id: 3,
                point: "Exercitation sunt laboris minim aliquip sint.",
                required: false,
                fill: false,
                restrictions: [],
                positionId: null,
              },
              {
                id: 4,
                point: "Incididunt adipisicing et exercitation commodo id sint consequat aute.",
                required: false,
                fill: false,
                restrictions: [],
                positionId: null,
              },
              {
                id: 5,
                point: "In commodo ea adipisicing nulla ullamco anim minim dolore officia et magna officia.",
                required: false,
                fill: false,
                restrictions: [],
                positionId: null,
              },
              {
                id: 6,
                point: "Ex eu in laboris cupidatat amet magna nulla pariatur ea sint mollit.",
                required: false,
                fill: false,
                restrictions: [],
                positionId: null,
              },
              {
                id: 7,
                point:
                  "Irure reprehenderit dolor excepteur voluptate exercitation cupidatat minim excepteur nostrud pariatur ad.",
                required: false,
                fill: false,
                restrictions: [],
                positionId: null,
              },
              {
                id: 8,
                point: "Non ad reprehenderit laboris Lorem commodo et qui ullamco tempor.",
                required: false,
                fill: false,
                restrictions: [],
                positionId: null,
              },
              {
                id: 9,
                point: "Do nostrud ea culpa exercitation.",
                required: false,
                fill: false,
                restrictions: [],
                positionId: null,
              },
            ],
            resumeSectionTitle: "",
          },
        ],
      },
    ],
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
};
