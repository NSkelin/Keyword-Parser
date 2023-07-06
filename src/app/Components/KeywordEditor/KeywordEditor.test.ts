import {validateInput} from "./KeywordEditor";

test("Empty string returns false", () => {
  expect(validateInput("")).toBe(false);
});

test("String must be greater than 1 character", () => {
  expect(validateInput("a")).toBe(false);
  expect(validateInput("ab")).toBe(true);
});
