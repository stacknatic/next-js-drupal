import { z } from "zod";

export const CategorySchema = z.object({
  type: z.literal("taxonomy_term--article_category"),
  id: z.string(),
  name: z.string(),
});

