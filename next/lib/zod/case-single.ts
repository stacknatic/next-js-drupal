import { z } from "zod";
import { ImageShape } from "@/lib/zod/paragraph";
import { LinkLogoSchema } from "@/lib/zod/case-card";
import { MetatagsSchema } from "./metatag";


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
  field_logos: z.array(LinkLogoSchema).nullable(),
});

export type CaseSingleType = z.infer<typeof CaseSingleSchema>;
