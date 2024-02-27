/** Creates a regular expression capable of matching all the keywords sent in. */
export function createKeywordsRegEx(keywords: string[] | string) {
  if (keywords.length < 1) {
    throw new Error("Keyword(s) cannot be empty");
  } else if (typeof keywords === "string") {
    const escapedKeyword = keywords.replace(/[+#]/g, "\\$&");
    return new RegExp(`(?<!w)${escapedKeyword}(?!w)`, "gi");
  } else {
    const sortedKeywords = keywords.toSorted((a, b) => b.length - a.length);
    const escapedKeywords = sortedKeywords.map((keyword) => {
      return keyword.replace(/[+#]/g, "\\$&");
    });
    return new RegExp(`\\b${escapedKeywords.join("\\b|\\b")}\\b`, "gi");
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

export interface ValidationInputRules {
  /** Determines if the input is required, and therefore has a length > 0.
   * @default false
   */
  required?: boolean;
  /** The minimum input length allowed.
   * @default 0
   */
  minLen?: number;
  /** The maximum input length allowed. */
  maxLen?: number;
}
/**
 * Validates a string against the given rules
 */
export function validateInput(input: string, rules?: ValidationInputRules) {
  const required = rules?.required ?? false;
  const minLen = rules?.minLen ?? 0;
  const maxLen = rules?.maxLen;

  input = input.trim();

  if (required && input.length === 0) {
    return {
      valid: false,
      error: "Cannot be empty",
    };
  }

  if (input.length < minLen) {
    return {
      valid: false,
      error: `Input must be at least ${minLen} characters long.`,
    };
  }

  if (maxLen != null && input.length > maxLen) {
    return {
      valid: false,
      error: `Input must be at most ${maxLen} characters long.`,
    };
  }

  const matches = input.match(/[^\w #+]/g);
  const uniqueMatches = [...new Set(matches)];

  if (uniqueMatches.length > 0) {
    let matchStr = "";
    for (const match of uniqueMatches) {
      matchStr = matchStr + match + " ";
    }
    return {
      valid: false,
      error: `Invalid characters: ${matchStr}`,
    };
  }

  return {valid: true, error: ""};
}
