"use server";

import {createCollections, updateCollection} from "@/database/tableQueries/keywordCollection";
import {deleteCollection} from "@/database/tableQueries/keywordCollection/collection";
import {createCollectionSchema} from "./zodSchemas";

export async function createCollectionAction(formData: FormData) {
  const {success, data} = createCollectionSchema.safeParse({
    title: formData.get("title"),
  });

  if (!success) {
    return {success: false, message: "Invalid form data"};
  }

  const {title} = data;

  try {
    const data = await createCollections([{title, highlightColor: "FFFFFF"}]);

    if (data.success) {
      return {success: true, message: ""};
    } else if (data.error?.code === "P2002") {
      return {success: false, message: `Collection "${title}" already exists!`};
    } else {
      return {success: false, message: "Something went wrong, please try again later."};
    }
  } catch {
    return {success: false, message: "Something went wrong, please try again later."};
  }
}

export async function updateCollectionAction(collectionTitle: string, newData: {newTitle?: string; newHighlightColor?: string}) {
  await updateCollection(collectionTitle, newData);
}

export async function deleteCollectionAction(title: string) {
  await deleteCollection(title);
}
