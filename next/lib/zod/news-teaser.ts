import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { NewsBaseSchema } from "@/lib/zod/news";

export const NewsTeaserSchema = NewsBaseSchema.extend({
  path: z.object({
    alias: z.string(),
  }),
});

export function validateAndCleanupNewsTeaser(
  newsTeaser: DrupalNode,
): NewsTeaser | null {
  try {
    return NewsTeaserSchema.parse(newsTeaser);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log('news teaser error', JSON.stringify({ name, issues, newsTeaser }, null, 2));
    return null;
  }
}

export type NewsTeaser = z.infer<typeof NewsTeaserSchema>;
