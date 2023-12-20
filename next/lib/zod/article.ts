import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";
import { ImageShape } from "@/lib/zod/paragraph";
import { CategorySchema, TagsSchema } from "@/lib/zod/taxonomy-schema";

export const ArticleBaseSchema = z.object({
  type: z.literal("node--article"),
  id: z.string(),
  created: z.string(),
  sticky: z.boolean().optional(),
  title: z.string(),
  field_excerpt: z.string().optional().nullable(),
  field_image: ImageShape.optional().nullable(),
  field_category: CategorySchema.optional().nullable(),
  field_tags: TagsSchema.optional().nullable(),
  field_anchor_nav: z.boolean().optional().nullable(),
  
});

export const ArticleSchema = ArticleBaseSchema.extend({
  metatag: MetatagsSchema.optional(),
  body: z.object({
    processed: z.string(),
  }),
  field_user_avatar: ImageShape.optional(),
  changed: z.string(),
  uid: z.object({
    id: z.string(),
    display_name: z.string(),
    field_user_avatar: ImageShape.optional(),
  }),
});

export function validateAndCleanupArticle(article: DrupalNode): Article | null {
  try {
    return ArticleSchema.parse(article);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    // console.log(JSON.stringify({ name, issues, article }, null, 2));
    return null;
  }
}

export type Article = z.infer<typeof ArticleSchema>;