/** Creates a regular expression capable of matching all the keywords sent in. */
export function createKeywordsRegEx(keywords: string[] | string) {
  if (keywords.length < 1) {
    throw new Error("Keyword(s) cannot be empty");
  } else if (typeof keywords === "string") {
    return new RegExp(`\\b${keywords}\\b`, "gi");
  } else {
    return new RegExp(`\\b${keywords.join("\\b|\\b")}\\b`, "gi");
  }
}
interface Keyword {
  displayName: string;
  instances: number;
  proficient: boolean;
  aliases: string[];
}
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

/** Returns all keywords that exist in the job description. */
export function getInstancedKeywords(keywords: Keyword[]) {
  return keywords.reduce<Keyword[]>((accumulator, keyword) => {
    const {instances} = keyword;
    if (instances > 0) {
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

/** Calls getMatches but removes all duplicate matches from the search before returning the result.
 *
 * The search is case insensitive and will return an array of words following the case sensitivity of the wordsToMatch array sent in.
 */
export function getUniqueMatches(textToMatch: string, wordsToMatch: string[]) {
  const matches = getMatches(textToMatch, wordsToMatch);

  if (matches === null) return [];

  // search each word for a match and return the original word.
  const uniqueMatches = wordsToMatch.reduce<string[]>((accumulator, word) => {
    if (matches.some((e) => e.toLowerCase() === word.toLowerCase())) {
      accumulator.push(word);
    }
    return accumulator;
  }, []);

  return uniqueMatches;
}
