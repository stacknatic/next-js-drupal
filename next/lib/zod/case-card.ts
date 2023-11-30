import { DrupalNode } from "next-drupal";
import { string, z } from "zod";
import { ImageShape } from "@/lib/zod/paragraph";

export const WebSiteSchema = z.object({
  title: z.string(),
  full_url: z.string().url(),
});

export const ClientSchema = z.object({
  type: z.literal("paragraph--client"),
  field_client_name: z.string(),
  id: z.string(),
  field_website: z.array(WebSiteSchema).nullable(),
  field_email: z.array(z.string().email()).nullable(),
  field_facebook: z.object({ full_url: z.string().url() }).nullable(),
  field_social_links: z.object({ full_url: z.string().url() }).nullable(),
  field_instagram: z.object({ full_url: z.string().url() }).nullable(),
  field_linkedin: z.object({ full_url: z.string().url() }).nullable(),
  field_twitter: z.object({ full_url: z.string().url() }).nullable(),
  field_youtube: z.object({ full_url: z.string().url() }).nullable(),
});

export const CaseCardSchema = z.object({
  type: z.literal("node--cases"),
  id: z.string(),
  title: z.string(),
  path: z.object({ alias: z.string() }),
  field_image: ImageShape.nullable(),
  field_excerpt: z.string().optional().nullable(),
  field_clients: z.array(ClientSchema).nullable(),
});

export type CaseCardType = z.infer<typeof CaseCardSchema>;
export type ClientType= z.infer<typeof ClientSchema>