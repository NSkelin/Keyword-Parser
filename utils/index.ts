type keyword = {displayName: string; aliases: string[]};

// creates the regex for highlighting the keywords
export function createKeywordsRegEx(keywords: keyword[]) {
  let arr: string[] = [];
  for (const words of keywords) {
    arr = [...words.aliases, ...arr];
  }
  return new RegExp(`\\b${arr.join("\\b|\\b")}\\b`, "gi");
}
