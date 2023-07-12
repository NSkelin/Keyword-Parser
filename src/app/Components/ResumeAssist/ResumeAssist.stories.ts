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
          title: "duis",
          start: "Dec.2011",
          end: "May.2018",
          company: "Kidgrease",
        },
        bullets: [
          {
            ID: 0,
            bullet: "Enim minim proident laboris amet nulla magna laborum aute reprehenderit tempor laborum.",
          },
          {
            ID: 1,
            bullet: "Veniam non adipisicing id irure fugiat.",
          },
          {
            ID: 2,
            bullet: "Pariatur sit nostrud amet laborum enim duis ex tempor ea incididunt do non do sunt.",
          },
          {
            ID: 3,
            bullet: "Incididunt voluptate tempor amet adipisicing est cupidatat consequat elit commodo exercitation amet ex.",
          },
          {
            ID: 4,
            bullet: "Sunt minim ullamco dolore ad magna exercitation minim reprehenderit consequat duis duis elit dolor.",
          },
          {
            ID: 5,
            bullet: "Ullamco eiusmod excepteur proident aliqua occaecat magna est ut.",
          },
          {
            ID: 6,
            bullet: "Exercitation ut ut amet fugiat laboris aute consequat.",
          },
          {
            ID: 7,
            bullet: "Velit eu irure labore exercitation aliqua.",
          },
        ],
      },
      {
        position: {
          title: "cillum",
          start: "Feb.2013",
          end: "Oct.2017",
          company: "Hivedom",
        },
        bullets: [
          {
            ID: 0,
            bullet:
              "Pariatur commodo duis nulla et esse nisi reprehenderit irure magna consectetur fugiat ullamco ullamco fugiat.",
          },
          {
            ID: 1,
            bullet: "Laboris ullamco do ea excepteur do sit sint eiusmod sint dolore.",
          },
          {
            ID: 2,
            bullet: "Ullamco sit dolor incididunt nisi mollit cillum ipsum proident.",
          },
          {
            ID: 3,
            bullet: "Qui esse laboris nisi enim enim cupidatat proident quis non laboris et.",
          },
          {
            ID: 4,
            bullet: "Incididunt pariatur eu qui incididunt aute et dolor sit.",
          },
          {
            ID: 5,
            bullet: "Esse enim cupidatat mollit id.",
          },
          {
            ID: 6,
            bullet: "Occaecat voluptate ad consequat qui sunt id enim officia excepteur anim ut nulla.",
          },
        ],
      },
    ],
    education: [
      {
        position: {
          title: "irure",
          start: "Mar.2012",
          end: "Oct.2017",
          company: "Stelaecor",
        },
        bullets: [
          {
            ID: 0,
            bullet: "Amet magna esse excepteur enim excepteur duis cupidatat Lorem quis commodo reprehenderit cupidatat.",
          },
          {
            ID: 1,
            bullet: "Laboris culpa eiusmod enim aliqua aute.",
          },
          {
            ID: 2,
            bullet: "Nulla incididunt commodo eiusmod velit aliqua anim deserunt elit ea.",
          },
          {
            ID: 3,
            bullet: "Consequat consectetur aliquip aliqua est aute consequat voluptate.",
          },
          {
            ID: 4,
            bullet: "Pariatur cillum mollit reprehenderit culpa.",
          },
          {
            ID: 5,
            bullet: "Sint ex elit eu pariatur.",
          },
          {
            ID: 6,
            bullet: "Fugiat adipisicing amet cupidatat tempor id irure ea nulla laboris.",
          },
        ],
      },
    ],
    keywords: ["consequat", "do", "sint", "ad", "consequat", "dolore", "officia", "minim", "excepteur", "cillum"],
  },
};
