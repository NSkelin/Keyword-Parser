import {z} from "zod";

export const createCollectionSchema = z.object({
  title: z.string(),
});
