import type {StorybookConfig} from "@storybook/nextjs";
const config: StorybookConfig = {
  stories: ["../src/app/Components/**/*.mdx", "../src/app/Components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: true,
  },
};
export default config;
