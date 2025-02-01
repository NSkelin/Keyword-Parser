"use server";

import {createCollections} from "@/database/tableQueries/keywordCollection/collection";
import {z} from "zod";

const NewCollection = z.object({
  title: z.string(),
});

export async function createCollection(formData: FormData) {
  const {title} = NewCollection.parse({
    title: formData.get("title"),
  });

  await createCollections([{title, highlightColor: "FFFFFF"}]);
  console.log("success");
  return;
}
