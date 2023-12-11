import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";
import { ImageShape, LinkShape } from "@/lib/zod/paragraph";
import { CategorySchema } from "./taxonomy-schema";
export const ArticleBaseSchema = z.object({
  type: z.literal("node--article"),
  id: z.string(),
  created: z.string(),
  sticky: z.boolean().optional(),
  title: z.string(),
  field_excerpt: z.string().optional().nullable(),
  field_image: ImageShape.nullable(),
  
});

const ArticleSchema = ArticleBaseSchema.extend({
  metatag: MetatagsSchema.optional(),
  body: z.object({
    processed: z.string(),
  }),
  
  field_anchor_nav: z.boolean().optional(),
  uid: z.object({
    id: z.string(),
    display_name: z.string(),
    field_user_avatar: ImageShape.nullable(),
    
  }),
  field_category: CategorySchema.optional(),
 
  // field_category: z.object({
  //   id: z.string(),
  //   type: z.string(),
    
  // }),
  field_tags: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      
    }),
    z.object({ drupal_internal__target_id: z.number() })
  ),
  
 
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
