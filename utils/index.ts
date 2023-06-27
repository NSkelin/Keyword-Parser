// creates the regex for highlighting the keywords
export function createKeywordsRegEx(keywords: string[]) {
  let arr: string[] = [];
  for (const keyword of keywords) {
    arr.push(keyword);
  }

  return new RegExp(`\\b${arr.join("\\b|\\b")}\\b`, "gi");
}
