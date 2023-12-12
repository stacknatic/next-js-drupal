import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { ArticleBaseSchema, ArticleSchema } from "@/lib/zod/article";
import { CategorySchema, TagsSchema } from "./taxonomy-schema";
import { PostSchema } from "./post-schema";
import { TeaserSchema } from "@/lib/zod/article";


export const ArticleTeaserSchema = ArticleBaseSchema.extend({
  path: z.object({
    alias: z.string(),
  }),
});



export function validateAndCleanupArticleTeaser(
  articleTeaser: DrupalNode,
): ArticleTeaser | null {
  try {
    return ArticleTeaserSchema.parse(articleTeaser);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, articleTeaser }, null, 2));
    return null;
  }
}
export type ArticleTeaser = z.infer<typeof ArticleTeaserSchema>;
