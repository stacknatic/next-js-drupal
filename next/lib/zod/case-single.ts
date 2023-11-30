import { z } from "zod";
import { ImageShape } from "@/lib/zod/paragraph";
import { WebSiteSchema, ClientSchema } from "@/lib/zod/case-card";
import { MetatagsSchema } from "./metatag";

export const ProjectSchema = z.object({
  type: z.literal("paragraph--project"),
  pield_project_name: z.string(),
  id: z.string(),
  field_website: z.array(WebSiteSchema).nullable(),
});

export const CaseSingleSchema = z.object({
  type: z.literal("node--cases"),
  id: z.string(),
  title: z.string(),
  field_image: ImageShape.nullable(),
  body: z
    .object({
      processed: z.string(),
    })
    .nullable(),
  metatag: MetatagsSchema.nullable(),
  field_clients: z.array(ClientSchema).nullable(),
  field_projects: z.array(ProjectSchema).nullable(),
});

export type CaseSingleType = z.infer<typeof CaseSingleSchema>;
export type ProjectType = z.infer<typeof ProjectSchema>;
