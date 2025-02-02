import type {Keyword} from "@/utils/types";
import {CSSProperties} from "react";

interface CreateKeywordAction {
  type: "createKeyword";
  keywordId: number;
  collectionName: string;
  displayName: string;
  proficient: boolean;
  aliases: string[];
  instances: number;
}

interface UpdateKeywordAction {
  type: "updateKeyword";
  collectionName: string;
  keywordId: number;
  newDisplayName?: string;
  proficient?: boolean;
  newAliases?: string[];
  instances?: number;
}

interface DeleteKeywordAction {
  type: "deleteKeyword";
  collectionName: string;
  keywordId: number;
}

interface CreateCollectionAction {
  type: "createCollection";
  collectionName: string;
}
interface UpdateCollectionAction {
  type: "updateCollection";
  collectionName: string;
  newCollectionName: string;
  newHighlightColor: string;
}
interface DeleteCollectionAction {
  type: "deleteCollection";
  collectionName: string;
}

interface Display {
  title: string;
  keywords: Keyword[];
  highlightColor: CSSProperties["backgroundColor"];
}

/** Updates the states keywords. Can create new keywords, update existing keywords, and deleting existing keywords. */
export function collectionsReducer(
  draft: Display[],
  action:
    | CreateKeywordAction
    | UpdateKeywordAction
    | DeleteKeywordAction
    | CreateCollectionAction
    | UpdateCollectionAction
    | DeleteCollectionAction,
) {
  switch (action.type) {
    case "createKeyword": {
      const collection = draft.find((collection) => collection.title === action.collectionName);
      if (collection == null) throw new Error("Collection doesnt exist!");

      const newKeyword = {
        id: action.keywordId,
        displayName: action.displayName,
        instances: action.instances,
        proficient: action.proficient,
        aliases: action.aliases,
      };
      collection.keywords.push(newKeyword);
      break;
    }

    case "updateKeyword": {
      const collection = draft.find((collection) => collection.title === action.collectionName);
      if (collection == null) throw new Error("Collection doesnt exist!");

      const keyword = collection.keywords.find((keyword) => keyword.id === action.keywordId);
      if (keyword == null) throw new Error("Keyword doesnt exist!");

      keyword.aliases = action.newAliases ?? keyword.aliases;
      keyword.displayName = action.newDisplayName ?? keyword.displayName;
      keyword.proficient = action.proficient ?? keyword.proficient;
      keyword.instances = action.instances ?? keyword.instances;

      break;
    }

    case "deleteKeyword": {
      const collection = draft.find((collection) => collection.title === action.collectionName);
      if (collection == null) throw new Error("Collection doesnt exist!");

      const index = collection.keywords.findIndex((keyword) => keyword.id === action.keywordId);
      if (index !== -1 && index != null) {
        collection.keywords.splice(index, 1);
      }
      break;
    }

    case "createCollection": {
      const collection = draft.find((collection) => collection.title === action.collectionName);
      if (collection != null) throw new Error("Collection already exists!");

      const newCollection = {
        title: action.collectionName,
        highlightColor: "FFFFFF",
        keywords: [],
      };
      draft.push(newCollection);
      break;
    }

    case "updateCollection": {
      const collection = draft.find((collection) => collection.title === action.collectionName);
      if (collection == null) throw new Error("Collection doesnt exist!");

      collection.title = action.newCollectionName;
      collection.highlightColor = action.newHighlightColor;
      break;
    }

    case "deleteCollection": {
      const index = draft.findIndex((collection) => collection.title === action.collectionName);
      if (index === -1) throw new Error("Collection doesn't exist!");

      draft.splice(index, 1); // Remove the collection from the draft
      break;
    }
  }
}
