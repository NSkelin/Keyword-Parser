import {createKeywordAndAliases} from "utils/prisma";

export async function POST(req: Request, {params}: {params: {collection: string}}) {
  try {
    const collection = params.collection;
    const data = await req.json();

    const displayName = data.displayName;
    const aliases: string[] = data.aliases;

    if (typeof displayName === "string") {
      const aliasObjs = aliases.map((alias) => {
        return {alias: alias};
      });
      createKeywordAndAliases(displayName, aliasObjs, collection);
    } else {
      return new Response("Failed", {status: 400});
    }

    return new Response("Success");
  } catch (error) {
    console.log(error);
    return new Response("Failed", {status: 400});
  }
}
