import {Meta, StoryObj} from "@storybook/react";
import BulletList from "./BulletList";

const meta: Meta<typeof BulletList> = {
  component: BulletList,
};

export default meta;
type Story = StoryObj<typeof BulletList>;

export const Default: Story = {
  args: {
    bullets: [
      {
        ID: 0,
        bullet: "Proident voluptate reprehenderit adipisicing tempor tempor sint ea ullamco.",
      },
      {
        ID: 1,
        bullet: "Sint tempor non dolor do incididunt quis anim proident voluptate Lorem.",
      },
      {
        ID: 2,
        bullet: "Veniam ullamco ut pariatur adipisicing dolore incididunt.",
      },
      {
        ID: 3,
        bullet: "Proident reprehenderit incididunt qui ad fugiat adipisicing culpa tempor minim velit.",
      },
      {
        ID: 4,
        bullet: "Magna velit mollit ex est fugiat culpa aliqua dolor duis laboris incididunt proident.",
      },
      {
        ID: 5,
        bullet: "Commodo non mollit incididunt commodo cupidatat ad esse dolore qui id.",
      },
      {
        ID: 6,
        bullet: "Laboris culpa nostrud laborum consequat enim cillum.",
      },
      {
        ID: 7,
        bullet: "Excepteur aute deserunt mollit minim consequat in.",
      },
      {
        ID: 8,
        bullet: "Aliquip eiusmod ut veniam exercitation proident fugiat magna ipsum eu laborum enim.",
      },
      {
        ID: 9,
        bullet: "Do veniam esse officia cillum ea sunt id quis sint proident velit nostrud velit sunt.",
      },
      {
        ID: 10,
        bullet: "Est anim veniam consectetur cillum amet laboris nostrud cillum voluptate nisi irure.",
      },
      {
        ID: 11,
        bullet: "Et aute ut nisi ea qui officia sunt irure ut do voluptate velit enim eu.",
      },
      {
        ID: 12,
        bullet: "Velit aliquip eiusmod mollit elit.",
      },
      {
        ID: 13,
        bullet: "Elit deserunt occaecat exercitation mollit sint commodo laborum irure pariatur magna.",
      },
      {
        ID: 14,
        bullet: "Ipsum in voluptate veniam consectetur quis.",
      },
    ],
    keywords: ["ipsum", "ullamco", "do", "cupidatat", "consequat", "quis", "sunt", "reprehenderit", "officia", "adipisicing"],
    overrides: new Map(),
  },
};
