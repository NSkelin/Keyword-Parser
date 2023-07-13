/** Creates a regular expression out of one or more keywords. Used for highlighting keywords. */
export function createKeywordsRegEx(keywords: string[] | string) {
  if (typeof keywords === "string") {
    return new RegExp(`\\b${keywords}\\b`, "gi");
  } else {
    return new RegExp(`\\b${keywords.join("\\b|\\b")}\\b`, "gi");
  }
}
type Keyword = {displayName: string; instances: number; proficient: boolean; aliases: string[]};
/** Returns the keywords aliases. */
export function getAliases(keywords: Keyword[]) {
  return keywords.flatMap(({aliases}) => aliases);
}

/** Returns all keywords with a match that the user is also proficient in. */
export function getFoundProficientKeywords(keywords: Keyword[]) {
  return keywords.reduce<Keyword[]>((accumulator, keyword) => {
    const {instances, proficient} = keyword;
    if (instances > 0 && proficient) {
      accumulator.push(keyword);
    }
    return accumulator;
  }, []);
}

/** Searchs a string and returns an array of every word that matches the sent in words. */
export function getMatches(textToMatch: string, wordsToMatch: string[]) {
  const regEx = createKeywordsRegEx(wordsToMatch);
  return textToMatch.match(regEx);
}

/** Searchs a string and returns an array of every unique word that matches the sent in words.
 * Similar to getMatches(), but does not return duplicate matches.
 */
export function getUniqueMatches(textToMatch: string, wordsToMatch: string[]) {
  const regEx = createKeywordsRegEx(wordsToMatch);
  const matches = textToMatch.match(regEx);
  return [...new Set(matches)];
}
