import { DrupalNode } from "next-drupal";
import { string, z } from "zod";
import { ImageShape } from "@/lib/zod/paragraph";

// export const LinkSchema = z.object({
//   title: z.string(),
//   full_url: z.string().url(),
// });

export const LinkLogoSchema = z.object({
  type: z.literal("paragraph--logolink"),
  id: z.string(),
  field_link: z.object({
    full_url: z.string().url(),
  }),
  field_logo: z.object({
    uri: z.object({
      url: z.string(),
    }),
    resourceIdObjMeta: z.object({
      alt: z.string(),
    })
  }),
});

export const CaseCardSchema = z.object({
  type: z.literal("node--cases"),
  id: z.string(),
  title: z.string(),
  path: z.object({ alias: z.string().nullable() }),
  field_image: ImageShape.nullable(),
  field_excerpt: z.string().optional().nullable(),
  field_logos: z.array(LinkLogoSchema).nullable(),
});

export type CaseCardType = z.infer<typeof CaseCardSchema>;
export type LinkLogoType= z.infer<typeof LinkLogoSchema>