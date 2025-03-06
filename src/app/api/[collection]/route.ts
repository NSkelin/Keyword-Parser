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

    const result = await createKeywordWithAliases(title, proficient, aliasObjs, collection);

    if (result.success) {
      const id = result.data;
      return NextResponse.json({success: true, message: "", id});
    } else {
      const error = result.error;
      if (error.code === "P2002") {
        if (!error.meta || !Array.isArray(error.meta.target)) return;
        if (error.meta?.target[0] === "keyword")
          return NextResponse.json({success: false, message: "The Keyword already exists."});
        else if (error.meta?.target[0] === "alias")
          return NextResponse.json({success: false, message: "An Alias already exists."});
      } else {
        return NextResponse.json({success: false, message: "Something went wrong, please try again later."});
      }
    }
  } catch {
    return NextResponse.json({success: false, message: "Something went wrong, please try again later."});
  }
}
