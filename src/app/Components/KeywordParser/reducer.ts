import {CSSProperties} from "react";

interface CreateAction {
  type: "create";
  keywordId: number;
  collectionName: string;
  displayName: string;
  proficient: boolean;
  aliases: string[];
}

interface UpdateAction {
  type: "update";
  collectionName: string;
  keywordId: number;
  newDisplayName?: string;
  proficient?: boolean;
  newAliases?: string[];
  instances?: number;
}

interface DeleteAction {
  type: "delete";
  collectionName: string;
  keywordId: number;
}

interface Display {
  title: string;
  keywords: {id: number; displayName: string; proficient: boolean; instances: number; aliases: string[]}[];
  highlightColor: CSSProperties["backgroundColor"];
}

/** Updates the states keywords. Can create new keywords, update existing keywords, and deleting existing keywords. */
export function keywordsReducer(draft: Display[], action: CreateAction | UpdateAction | DeleteAction) {
  switch (action.type) {
    case "create": {
      const collection = draft.find((collection) => collection.title === action.collectionName);
      if (collection == null) throw new Error("Collection doesnt exist!");

      const newKeyword = {
        id: action.keywordId,
        displayName: action.displayName,
        instances: 0,
        proficient: action.proficient,
        aliases: action.aliases,
      };
      collection.keywords.push(newKeyword);
      break;
    }

    case "update": {
      const collection = draft.find((collection) => collection.title === action.collectionName);
      if (collection == null) throw new Error("Collection doesnt exist!");

      const keyword = collection.keywords.find((keyword) => keyword.displayName === action.newDisplayName);
      if (keyword == null) throw new Error("Keyword doesnt exist!");

      keyword.aliases = action.newAliases ?? keyword.aliases;
      keyword.displayName = action.newDisplayName ?? keyword.displayName;
      keyword.proficient = action.proficient ?? keyword.proficient;
      keyword.instances = action.instances ?? keyword.instances;

      break;
    }

    case "delete": {
      const collection = draft.find((collection) => collection.title === action.collectionName);
      if (collection == null) throw new Error("Collection doesnt exist!");

      const index = collection.keywords.findIndex((keyword) => keyword.id === action.keywordId);
      if (index !== -1 && index != null) {
        collection.keywords.splice(index, 1);
      }
      break;
    }
  }
}
