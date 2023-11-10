import { z } from "zod";
import { ImageShape } from "@/lib/zod/paragraph";
import { WebSiteSchema, OrganizerSchema } from "@/lib/zod/event-card";
import { MetatagsSchema } from "./metatag";

export const SpeakerSchema = z.object({
  type: z.literal("paragraph--speaker_detail"),
  field_speaker: z.string(),
  id: z.string(),
  field_website: z.array(WebSiteSchema).nullable(),
  field_email: z.array(z.string().email()).nullable(),
  field_facebook: z.object({ full_url: z.string().url() }).nullable(),
  field_instagram: z.object({ full_url: z.string().url() }).nullable(),
  field_linkedin: z.object({ full_url: z.string().url() }).nullable(),
  field_twitter: z.object({ full_url: z.string().url() }).nullable(),
  field_youtube: z.object({ full_url: z.string().url() }).nullable(),
});

export const EventSingleSchema = z.object({
  type: z.literal("node--events"),
  id: z.string(),
  title: z.string(),
  field_start_date: z.string().nullable(),
  field_end_date: z.string().nullable(),
  field_image: ImageShape.nullable(),
  body: z
    .object({
      processed: z.string(),
    })
    .nullable(),
  metatag: MetatagsSchema.nullable(),
  field_organizers: z.array(OrganizerSchema).nullable(),
  field_speakers: z.array(SpeakerSchema).nullable(),
});

export type EventSingleType = z.infer<typeof EventSingleSchema>;
export type SpeakerType = z.infer<typeof SpeakerSchema>;
