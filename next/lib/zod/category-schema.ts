import { z } from 'zod';

const CategoryDataSchema = z.object({
  type: z.string(),
  id: z.string(),
  meta: z.object({
    drupal_internal__target_id: z.number(),
  }),
});

const CategoryLinksSchema = z.object({
  related: z.object({
    href: z.string().url(),
  }),
  self: z.object({
    href: z.string().url(),
  }),
});

const FieldCategorySchema = z.object({
  data: CategoryDataSchema,
  links: CategoryLinksSchema,
});

export default FieldCategorySchema;

