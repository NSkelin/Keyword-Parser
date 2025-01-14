import type {StorybookConfig} from "@storybook/nextjs";
const config: StorybookConfig = {
  stories: ["../src/app/components/**/*.mdx", "../src/app/components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: "@storybook/nextjs",
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};
export default config;
