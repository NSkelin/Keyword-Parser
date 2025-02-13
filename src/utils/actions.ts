"use server";

import {createCollections, updateCollection} from "@/database/tableQueries/keywordCollection";
import {deleteCollection} from "@/database/tableQueries/keywordCollection/collection";
import {z} from "zod";

const NewCollection = z.object({
  title: z.string(),
});

export async function createCollectionAction(formData: FormData) {
  const {title} = NewCollection.parse({
    title: formData.get("title"),
  });

  await createCollections([{title, highlightColor: "FFFFFF"}]);
}

export async function updateCollectionAction(collectionTitle: string, newData: {newTitle?: string; newHighlightColor?: string}) {
  await updateCollection(collectionTitle, newData);
}

export async function deleteCollectionAction(title: string) {
  await deleteCollection(title);
}
