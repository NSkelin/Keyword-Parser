// @ts-check

import {FlatCompat} from "@eslint/eslintrc";
import {dirname} from "path";
import {fileURLToPath} from "url";

import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import jest from "eslint-plugin-jest";
import storybook from "eslint-plugin-storybook";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
  allConfig: eslint.configs.all,
});

const eslintConfig = tseslint.config([
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  jest.configs["flat/recommended"],
  jest.configs["flat/style"],
  prettier,
  ...storybook.configs["flat/recommended"],
  {
    ignores: ["!**/.storybook", ".next", "cypress"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    languageOptions: {
      globals: {...jest.environments.globals.globals, cy: "writable"},
      ecmaVersion: "latest",
      sourceType: "script",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: "__dirname",
      },
    },

    rules: {
      camelcase: ["error", {properties: "always"}],
    },
  },
  {
    files: ["**/*.js", "**/*.mjs"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    // Allow empty functions because i am not going to mock them.
    files: ["**/*.stories.*", "**/*.cy.*"],
    rules: {
      "@typescript-eslint/no-empty-function": "off",
    },
  },
  {
    files: ["**/*.test.*", "**/*.cy.*"],
    rules: {
      "jest/consistent-test-it": ["error", {fn: "it"}],
    },
  },
  {
    // false warning because .cy. files are cypress not jest.
    files: ["**/*.cy.*"],
    rules: {
      "jest/expect-expect": "off",
    },
  },
  {
    // This is how cypress does it by default and im not changing it
    files: ["./cypress/support/component.ts"],
    rules: {
      "@typescript-eslint/no-namespace": ["error", {allowDeclarations: true}],
    },
  },
  {
    // Stop myself from creating circular dependancy errors. Read message property for more info.
    files: ["**/components/**/*.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/components", "!**/components/"],
              message:
                "Do not import the component barrel file (index.js) from inside a component being re-exported by the barrel.\
                This will cause circular dependency errors that are hard to find and understand.",
            },
          ],
        },
      ],
      //
      // eslint 9 version below, eslint 8 version above.
      //
      // "no-restricted-imports": [
      //   "error",
      //   {
      //     patterns: [
      //       {
      //         regex: "^(?:@/components/?|src/app/components/?)$",
      //         message:
      //           "Do not import the component barrel file (index.js) from inside a component being re-exported by the barrel.\
      //           This will cause circular dependency errors that are hard to find and understand.",
      //       },
      //     ],
      //   },
      // ],
    },
  },
  // Require using named exports instead of default exports since the general consensus online seems to be in favor of named exports (2024).
  // Ignore specifics entries (next, storybook, prisma, etc) that require default exports to work properly.
  {
    files: ["src/**"],
    rules: {
      "no-restricted-exports": ["warn", {restrictDefaultExports: {direct: true}}],
    },
  },
  {
    files: ["src/app/**/{page,layout,}.tsx", "src/app/**/*.stories.{ts,tsx}", "src/app/database/client.ts"], // Ignore.
    rules: {
      "no-restricted-exports": "off",
    },
  },
]);

export default eslintConfig;
