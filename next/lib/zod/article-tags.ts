import { DrupalNode } from "next-drupal";
import { z } from "zod";

export const articleTagsSchema = z.object({
    type: z.literal("taxonomy_term--tags"),
    id: z.string(),
    name: z.string(),
    });

export function validateAndCleanupArticleTags(taxonomy: DrupalNode): ArticleTags | null {
    try {
        return articleTagsSchema.parse(taxonomy);
    } catch (error) {
        const { name = "ZodError", issues = [] } = error;
        console.log(JSON.stringify({ name, issues, taxonomy }, null, 2));
        return null;
    }
}

export type ArticleTags = z.infer<typeof articleTagsSchema>;