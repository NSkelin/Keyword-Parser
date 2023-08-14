import {expect} from "@jest/globals";
import {validateInput} from "./KeywordEditor";

it("should not allow an empty string", () => {
  expect(typeof validateInput("")).toBe("string");
});

it("should not allow a string shorter than 2 characters and longer than 50 characters", () => {
  expect(typeof validateInput("a")).toBe("string");
  expect(typeof validateInput("a really long string aaaaa aaaaa aaaaa aaaaa aaaaa aaaaa aaaaa aaaaa aaaaa aaaaa")).toBe("string");
});

it("should not allow special characters", () => {
  expect(typeof validateInput("abc-")).toBe("string");
  expect(typeof validateInput("abc/")).toBe("string");
  expect(typeof validateInput("abc&")).toBe("string");
});

it("should allow regular characters", () => {
  expect(validateInput("abcdefghz lerpq")).toBe(null);
});

it("should allow numbers", () => {
  expect(validateInput("1 2 3456 78 9")).toBe(null);
});

it("should return the invalid characters as part of its error message", () => {
  const errMsg = validateInput("abc %.6 7lp() #qew");
  const specialChars = ["%", ".", "(", ")", "#"];

  const t = () => {
    for (const char of specialChars) {
      if (errMsg?.includes(char) === false) return false;
    }
    return true;
  };
  expect(t()).toBe(true);
});

it("should return duplicate invalid characters only once in its error message", () => {
  const errMsg = validateInput("abc***");

  expect(errMsg?.match(/[*]/g)?.length).toEqual(1);
});
