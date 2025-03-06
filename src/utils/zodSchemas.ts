import {z} from "zod";

export const createCollectionSchema = z.object({
  title: z.string().trim().min(1, "Collection name is required"),
});

export const createKeywordSchema = z.object({
  title: z.string().trim().min(1, "Display Name is required"),
  proficient: z.boolean(),
  aliases: z.string().array().min(1, "Atleast one alias is required"),
});
