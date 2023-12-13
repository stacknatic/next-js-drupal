import { DrupalNode } from "next-drupal";
import { z } from "zod";

export const articleCategorySchema = z.object({
    type: z.literal("taxonomy_term--article_category"),
    id: z.string(),
    name: z.string(),
    });

export function validateAndCleanupArticleCategory(taxonomy: DrupalNode): ArticleCategory | null {
    try {
        return articleCategorySchema.parse(taxonomy);
    } catch (error) {
        const { name = "ZodError", issues = [] } = error;
        console.log(JSON.stringify({ name, issues, taxonomy }, null, 2));
        return null;
    }
}

export type ArticleCategory = z.infer<typeof articleCategorySchema>;