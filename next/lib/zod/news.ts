import { DrupalNode } from "next-drupal";
import { z } from "zod";
import { MetatagsSchema } from "@/lib/zod/metatag";
import { ImageShape } from "@/lib/zod/news-paragraph";

export const NewsBaseSchema = z.object({
    type: z.literal("node--news"),
    id: z.string(),
    created: z.string(),
    sticky: z.boolean().optional(),
    uid: z.object({
      id: z.string(),
      display_name: z.string(),
    }),
    title: z.string(),
    field_image: ImageShape.nullable(),
    field_excerpt: z.string().optional().nullable(),
  });
  
  
  const NewsSchema = NewsBaseSchema.extend({
    metatag: MetatagsSchema.optional(),
    body: z.object({
      processed: z.string(),
    }),
    field_anchor_nav: z.boolean().optional(),
});

export function validateAndCleanupNews(news: DrupalNode): News | null {
  try {
    return NewsSchema.parse(news);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, news }, null, 2));
    return null;
  }
}

export type News = z.infer<typeof NewsSchema>;
