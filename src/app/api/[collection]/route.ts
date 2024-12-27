import {createKeywordAndAliases} from "@/database/tableQueries/keyword";
import {NextResponse} from "next/server";

interface data {
  displayName: string;
  aliases: string[];
  proficient: boolean;
}

/** Verify the data matchs the data interface */
function verifyData(data: unknown): data | undefined {
  if (typeof data !== "object" || data == null) {
    return;
  } else if (!("displayName" in data && typeof data.displayName === "string")) {
    return;
  } else if (!("aliases" in data && Array.isArray(data.aliases))) {
    return;
  } else if (!("proficient" in data && typeof data.proficient === "boolean")) {
    return;
  } else if (!data.aliases.every((x): x is string => typeof x === "string")) {
    return;
  }
  const {displayName, aliases, proficient} = data;
  return {displayName, aliases, proficient};
}

/** Handles the api call to create a new keyword */
export async function POST(req: Request, {params}: {params: {collection: string}}) {
  try {
    const collection = params.collection;
    const jsonData: unknown = await req.json();
    const data = verifyData(jsonData);

    if (data == null) return new Response("Failed", {status: 400});
    const {displayName, aliases, proficient} = data;

    const aliasObjs = aliases.map((alias) => {
      return {alias: alias};
    });
    const newId = await createKeywordAndAliases(displayName, proficient, aliasObjs, collection);
    return NextResponse.json({id: newId});
  } catch (error) {
    console.log(error);
    return new Response("Failed", {status: 400});
  }
}
