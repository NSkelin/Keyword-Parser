import {defineConfig} from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  viewportHeight: 1000,
  viewportWidth: 1600,
});
