import {createKeywordWithAliases} from "@/database/tableQueries/keyword";
import {createKeywordSchema} from "@/utils/zodSchemas";
import {NextResponse} from "next/server";

/** Handles the api call to create a new keyword */
export async function POST(req: Request, props: {params: Promise<{collection: string}>}) {
  const params = await props.params;
  try {
    const collection = params.collection;
    const jsonData: unknown = await req.json();

    const {success, data} = createKeywordSchema.safeParse(jsonData);

    if (!success) {
      return NextResponse.json({success: false, message: "Invalid form data"});
    }

    const {title, proficient, aliases} = data;

    const aliasObjs = aliases.map((alias) => {
      return {alias: alias};
    });

    const newId = await createKeywordWithAliases(title, proficient, aliasObjs, collection);

    return NextResponse.json({success: true, message: "", id: newId});
  } catch {
    return NextResponse.json({success: false, message: "Something went wrong, please try again later."});
  }
}
