import {createKeywordAndAliases} from "utils/prisma";

export async function POST(req: Request, {params}: {params: {collection: string}}) {
  try {
    const collection = params.collection;
    const data = await req.formData();

    const displayName = data.get("displayName");
    const aliases = data.get("aliases");

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
