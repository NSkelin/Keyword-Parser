import {Prisma} from "@prisma/client";

/** Creates a regular expression capable of matching all the keywords sent in. */
export function createKeywordsRegEx(keywords: string[] | string) {
  if (keywords.length < 1) throw new Error("Keyword(s) cannot be empty");
  if (typeof keywords === "string") keywords = [keywords];

  // Escape (allow) special regex characters in each string.
  const escapedKeywords = keywords.map((str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = escapedKeywords.join("|");
  return new RegExp(`(?<=^|[^\\w])(${pattern})(?=$|[^\\w])`, "gi");
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

interface SuccessResponse<T> {
  success: true;
  data: T;
}

interface ErrorResponse {
  success: false;
  error: Pick<Prisma.PrismaClientKnownRequestError, "code" | "message" | "meta">;
}

type Response<T> = SuccessResponse<T> | ErrorResponse;

/**
 * A Wrapper for prisma queries used to handle specific errors & returns in a consistent format.
 *
 * @param query The prisma query to be wrapped.
 * @returns One of two objects, both with a success value that determines if the query succeeded or not.
 *
 * - If the query succeeded it returns an additional data object with the queries return value.
 *
 * - If the query failed it returns an additional error object with info about the error.
 *
 * @throws any unhandled errors.
 */
export async function prismaQueryErrorHandlingWrapper<T>(query: () => Promise<T>): Promise<Response<T>> {
  try {
    const data = await query();
    return {success: true, data};
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      const {code, message, meta} = e;
      return {
        success: false,
        error: {
          code,
          message,
          meta,
        },
      };
    }
    throw e;
  }
}
