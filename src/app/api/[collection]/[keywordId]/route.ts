import {deleteKeywordAndAliases, updateKeywordAndAliases} from "@/database/tableQueries/keyword";

export async function DELETE(req: Request, {params}: {params: {collection: string; keywordId: number}}) {
  try {
    const keywordId = Number(params.keywordId);

    if (typeof keywordId === "number") {
      await deleteKeywordAndAliases(keywordId);
      return new Response("Success");
    } else {
      return new Response("Failed", {status: 400});
    }
  } catch (error) {
    console.log(error);
    return new Response("Failed", {status: 400});
  }
}

export async function PUT(req: Request, {params}: {params: {collection: string; keywordId: string}}) {
  interface data {
    newDisplayName: string;
    newAliases: string[];
    proficient: boolean;
  }

  /** Verify the data matchs the data interface */
  function verifyData(data: unknown): data | undefined {
    if (typeof data !== "object" || data == null) {
      return;
    } else if (!("newDisplayName" in data && typeof data.newDisplayName === "string")) {
      return;
    } else if (!("newAliases" in data && Array.isArray(data.newAliases))) {
      return;
    } else if (!("proficient" in data && typeof data.proficient === "boolean")) {
      return;
    } else if (!data.newAliases.every((x): x is string => typeof x === "string")) {
      return;
    }
    const {newDisplayName, newAliases, proficient} = data;
    return {newDisplayName, newAliases, proficient};
  }

  try {
    const jsonData: unknown = await req.json();
    const data = verifyData(jsonData);

    if (data == null) return new Response("Failed", {status: 400});

    const {newDisplayName, newAliases, proficient} = data;
    const keywordId = Number(params.keywordId);

    await updateKeywordAndAliases(keywordId, proficient, newAliases, newDisplayName);
    return new Response("Success");
  } catch (error) {
    console.log(error);
    return new Response("Failed", {status: 400});
  }
}
