/** Creates a regular expression out of one or more keywords. Used for highlighting keywords. */
export function createKeywordsRegEx(keywords: string[] | string) {
  if (typeof keywords === "string") {
    return new RegExp(`\\b${keywords}\\b`, "gi");
  } else {
    return new RegExp(`\\b${keywords.join("\\b|\\b")}\\b`, "gi");
  }
}
