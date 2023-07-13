import {Meta, StoryObj} from "@storybook/react";
import ResumeAssist from "./ResumeAssist";

const meta: Meta<typeof ResumeAssist> = {
  component: ResumeAssist,
};

export default meta;
type Story = StoryObj<typeof ResumeAssist>;

export const Default: Story = {
  args: {
    experience: [
      {
        position: {
          title: "ad",
          start: "Sep.2013",
          end: "Feb.2018",
          company: "Zoinage",
        },
        bullets: [
          {
            ID: 0,
            bullet: "Magna do eiusmod minim Lorem.",
          },
          {
            ID: 1,
            bullet: "Occaecat quis est cillum eiusmod duis non quis dolore fugiat.",
          },
          {
            ID: 2,
            bullet: "Et laborum irure anim Lorem sunt.",
          },
          {
            ID: 3,
            bullet: "Exercitation sunt laboris minim aliquip sint.",
          },
          {
            ID: 4,
            bullet: "Incididunt adipisicing et exercitation commodo id sint consequat aute.",
          },
          {
            ID: 5,
            bullet: "In commodo ea adipisicing nulla ullamco anim minim dolore officia et magna officia.",
          },
          {
            ID: 6,
            bullet: "Ex eu in laboris cupidatat amet magna nulla pariatur ea sint mollit.",
          },
          {
            ID: 7,
            bullet: "Irure reprehenderit dolor excepteur voluptate exercitation cupidatat minim excepteur nostrud pariatur ad.",
          },
          {
            ID: 8,
            bullet: "Non ad reprehenderit laboris Lorem commodo et qui ullamco tempor.",
          },
          {
            ID: 9,
            bullet: "Do nostrud ea culpa exercitation.",
          },
        ],
      },
      {
        position: {
          title: "cillum",
          start: "Jan.2015",
          end: "May.2018",
          company: "Newcube",
        },
        bullets: [
          {
            ID: 0,
            bullet: "Do sit adipisicing ullamco sunt in aliquip qui magna sit.",
          },
          {
            ID: 1,
            bullet: "Anim anim proident eiusmod tempor in cillum.",
          },
          {
            ID: 2,
            bullet: "Do enim eu pariatur Lorem ut veniam qui mollit non duis cillum ut.",
          },
          {
            ID: 3,
            bullet: "Cillum quis excepteur consectetur in reprehenderit in esse amet ipsum eiusmod dolore.",
          },
          {
            ID: 4,
            bullet: "Minim ea est voluptate laborum duis labore nostrud non laboris voluptate.",
          },
          {
            ID: 5,
            bullet: "Minim est voluptate minim tempor deserunt adipisicing.",
          },
          {
            ID: 6,
            bullet: "Ea Lorem dolor deserunt non magna labore nulla et enim ut dolor.",
          },
          {
            ID: 7,
            bullet: "Consectetur consectetur tempor enim proident ullamco tempor.",
          },
          {
            ID: 8,
            bullet: "Magna qui cupidatat mollit minim nulla eu sit culpa ad qui eu sit consequat sint.",
          },
          {
            ID: 9,
            bullet: "Ullamco non et sunt elit ipsum minim cupidatat excepteur fugiat labore est sint eu veniam.",
          },
          {
            ID: 10,
            bullet: "Officia excepteur non sunt et.",
          },
          {
            ID: 11,
            bullet: "In eiusmod dolor laboris deserunt et magna.",
          },
          {
            ID: 12,
            bullet: "Sit proident proident qui quis est irure ad eiusmod excepteur nisi elit enim.",
          },
          {
            ID: 13,
            bullet: "Laboris commodo labore labore voluptate dolor proident nulla et id.",
          },
        ],
      },
    ],
    education: [
      {
        position: {
          title: "deserunt",
          start: "Feb.2015",
          end: "Aug.2018",
          company: "Slumberia",
        },
        bullets: [
          {
            ID: 0,
            bullet:
              "Cupidatat eiusmod non veniam reprehenderit sunt ullamco dolor ea eu aliquip ea incididunt voluptate reprehenderit.",
          },
          {
            ID: 1,
            bullet: "Id consectetur enim nostrud adipisicing pariatur tempor.",
          },
          {
            ID: 2,
            bullet: "Dolore duis cillum voluptate labore reprehenderit aliquip tempor in et ipsum eu fugiat.",
          },
          {
            ID: 3,
            bullet: "Occaecat pariatur laborum quis cupidatat officia labore aute exercitation.",
          },
          {
            ID: 4,
            bullet: "In laborum veniam cupidatat elit fugiat ut amet est enim ipsum ut.",
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
