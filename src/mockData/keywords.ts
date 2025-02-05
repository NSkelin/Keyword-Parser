import {Keyword} from "@/utils/types";

export const getMockKeywords = (): Keyword[] => {
  // make the id always start from 0
  // so i dont have to manually edit ids when changing the data
  return keywordsData.map((keywords, index) => {
    return {id: index, ...keywords};
  });
};

const keywordsData: Omit<Keyword, "id">[] = [
  {displayName: "Cleveland", instances: 0, proficient: false, aliases: ["cupidatat", "magna", "minim"]},
  {displayName: "Sheppard", instances: 1, proficient: true, aliases: ["Burris", "May"]},
  {displayName: "Dixon", instances: 0, proficient: true, aliases: ["Katy", "Stella", "Angelique"]},
  {displayName: "Wilkins", instances: 0, proficient: true, aliases: ["Nanette"]},
  {displayName: "Acevedo", instances: 2, proficient: false, aliases: ["Castro"]},
  {displayName: "Ophelia", instances: 0, proficient: false, aliases: ["Herrera"]},
  {displayName: "Hester", instances: 2, proficient: false, aliases: ["Eula"]},
  {displayName: "Denise", instances: 0, proficient: true, aliases: ["Lindsey", "Gwendolyn", "Johns"]},
  {displayName: "Kari", instances: 0, proficient: true, aliases: ["Stephens", "Dionne", "Erin"]},
  {displayName: "Bette", instances: 0, proficient: true, aliases: ["Latisha", "Yang", "Ginger"]},
  {displayName: "Juliana", instances: 1, proficient: true, aliases: ["nostrud", "labore", "sit", "non", "occaecat"]},
  {displayName: "Sweet", instances: 0, proficient: false, aliases: ["fugiat", "eiusmod", "labore", "laborum", "aute"]},
  {displayName: "Hahn", instances: 0, proficient: true, aliases: ["aliquip", "nulla", "aute", "nulla"]},
  {displayName: "Richardson", instances: 0, proficient: true, aliases: ["duis", "pariatur", "irure", "est", "occaecat"]},
  {displayName: "Walton", instances: 9, proficient: true, aliases: ["ex", "consequat", "in", "anim", "ipsum"]},
  {displayName: "Mcdowell", instances: 0, proficient: false, aliases: ["magna", "ullamco", "sit", "veniam", "non"]},
  {displayName: "Lane", instances: 0, proficient: true, aliases: ["culpa", "excepteur", "veniam", "laborum", "elit"]},
  {displayName: "Edwards", instances: 0, proficient: false, aliases: ["esse", "Lorem", "dolor", "consectetur", "magna"]},
  {displayName: "Dorothy", instances: 0, proficient: true, aliases: ["Lorem", "dolore", "labore"]},
  {displayName: "Joyce", instances: 1, proficient: false, aliases: ["Lorem", "anim"]},
  {displayName: "Beatrice", instances: 3, proficient: true, aliases: ["in", "ea", "ex", "pariatur", "ad"]},
  {displayName: "Rhoda", instances: 0, proficient: true, aliases: ["commodo", "esse"]},
  {displayName: "Margarita", instances: 0, proficient: true, aliases: ["laborum", "qui"]},
  {displayName: "Robbins", instances: 0, proficient: false, aliases: ["minim", "aliquip", "incididunt"]},
  {displayName: "Lancaster", instances: 0, proficient: true, aliases: ["ipsum", "mollit"]},
  {displayName: "Austin", instances: 0, proficient: true, aliases: ["commodo", "voluptate"]},
  {displayName: "Schwartz", instances: 1, proficient: false, aliases: ["commodo", "occaecat", "ex", "enim", "ex"]},
  {displayName: "Annette", instances: 0, proficient: false, aliases: ["eiusmod", "labore", "magna", "sint"]},
  {displayName: "Lynn", instances: 0, proficient: false, aliases: ["amet", "reprehenderit", "est", "mollit", "non"]},
];
