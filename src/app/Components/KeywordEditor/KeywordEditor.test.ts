import {expect} from "@jest/globals";
import {validateInput} from "./KeywordEditor";

it("Empty string returns false", () => {
  expect(validateInput("")).toBe(false);
});

it("String must be greater than 1 character", () => {
  expect(validateInput("a")).toBe(false);
  expect(validateInput("ab")).toBe(true);
});
