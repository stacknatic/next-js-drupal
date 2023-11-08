import { DrupalNode } from "next-drupal";
import { string, z } from "zod";
import { ImageShape } from "@/lib/zod/paragraph";

export const WebSiteSchema = z.object({
  title: z.string(),
  full_url: z.string().url(),
});

export const OrganizerSchema = z.object({
  type: z.literal("paragraph--organizer_detail"),
  field_organizer_name: z.string(),
  field_website: z.array(WebSiteSchema).optional(),
  field_email: z.array(z.string().email()).optional(),
  field_facebook: z.object({ full_url: z.string().url() }).optional(),
  field_instagram: z.object({ full_url: z.string().url() }).optional(),
  field_linkedin: z.object({ full_url: z.string().url() }).optional(),
  field_twitter: z.object({ full_url: z.string().url() }).optional(),
  field_youtube: z.object({ full_url: z.string().url() }).optional(),
});

export const EventCardSchema = z.object({
  type: z.literal("node--events"),
  id: z.string(),
  title: z.string(),
  path: z.object({ alias: z.string() }),
  field_start_date: z.string(),
  field_image: ImageShape.nullable(),
  field_excerpt: z.string().optional().nullable(),
  field_organizers: z.array(OrganizerSchema),
});
