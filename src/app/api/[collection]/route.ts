import {createKeywordAndAliases} from "utils/prisma";

export async function POST(req: Request, {params}: {params: {collection: string}}) {
  try {
    const collection = params.collection;
    const data = await req.json();

    const displayName = data.displayName;
    const aliases = data.aliases;

    if (typeof displayName === "string" && typeof aliases === "string") {
      const aliasObjs = aliases.split(",").map((alias) => {
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
