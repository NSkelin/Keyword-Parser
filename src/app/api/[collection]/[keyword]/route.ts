import {deleteKeywordAndAliases, updateKeywordAndAliases} from "utils/prisma";

export async function DELETE(req: Request, {params}: {params: {collection: string; keyword: string}}) {
  try {
    const displayName = params.keyword;

    if (typeof displayName === "string") {
      await deleteKeywordAndAliases(displayName);
      return new Response("Success");
    } else {
      return new Response("Failed", {status: 400});
    }
  } catch (error) {
    console.log(error);
    return new Response("Failed", {status: 400});
  }
}

export async function PUT(req: Request, {params}: {params: {collection: string; keyword: string}}) {
  try {
    type data = {newDisplayName: string; newAliases: string[]; proficient: boolean};
    const {newDisplayName, newAliases, proficient}: data = await req.json();
    const displayName = params.keyword;

    updateKeywordAndAliases(displayName, proficient, newAliases, newDisplayName);
    return new Response("Success");
  } catch (error) {
    console.log(error);
    return new Response("Failed", {status: 400});
  }
}
