import { z } from "zod";

export const ServiceCategorySchema = z.object({
  type: z.literal("node--service_category"),
  id: z.string(),
  field_category_name: z.string(),
  field_category_description: z.string(),
  field_category_image: z.object({
    id: z.string(),
    uri: z.object({ url: z.string() }),
    resourceIdObjMeta: z.object({ alt: z.string() }),
  }),
});

// exporting type from schema

export type ServiceCategoryType = z.infer<typeof ServiceCategorySchema>;

// function to validate and clean up service categor data coming from drupal, and it will only return valid categories.

export function validateCleanupServiceCategoryData(
  categories: any,
): ServiceCategoryType[] {
  const validatedData = categories.reduce(
    (acc: ServiceCategoryType[], category: any) => {
      const valid = ServiceCategorySchema.safeParse(category);
      if (valid.success) {
        return [...acc, valid.data];
      } else {
        return acc;
      }
    },
    [],
  );
  return validatedData;
}
