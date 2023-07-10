import {createKeywordAndAliases} from "utils/prisma";

export async function POST(req: Request, {params}: {params: {collection: string}}) {
  try {
    const collection = params.collection;

    type data = {displayName: string; aliases: string[]; proficient: boolean};
    const {displayName, aliases, proficient}: data = await req.json();

    if (typeof displayName === "string") {
      const aliasObjs = aliases.map((alias) => {
        return {alias: alias};
      });
      createKeywordAndAliases(displayName, proficient, aliasObjs, collection);
    } else {
      return new Response("Failed", {status: 400});
    }

    return new Response("Success");
  } catch (error) {
    console.log(error);
    return new Response("Failed", {status: 400});
  }
}
