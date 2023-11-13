import { z } from "zod";

export const LogoLinkSchema = z.object({
  id: z.string(),
  field_link: z.object({
    full_url: z.string().url(),
    title: z.string(),
  }),
  field_logo: z.object({
    uri: z.object({
      url: z.string(),
    }),
    resourceIdObjMeta: z.object({
      alt: z.string(),
    }),
  }),
});

export const LogosSchema = z.object({
  type: z.literal("node--customer_logos").or(z.literal("node--partners_logos")),
  title: z.string(),
  field_logos: z.array(LogoLinkSchema),
});

export type LogoLinkType = z.infer<typeof LogoLinkSchema>;
export type LogosType = z.infer<typeof LogosSchema>;

//
export function logosLinksValidationCleanup(logo: any): LogosType {
  if (logo) {
    const toplevelLogs = LogosSchema.omit({
      field_logos: true,
    }).parse(logo);
    // data in array is being validated seperately, so that fail in one does not faild whole object.
    const validLogoLinks = logo.field_logos.reduce(
      (acc: LogoLinkType[], logo: any) => {
        const valid = LogoLinkSchema.safeParse(logo);
        if (valid.success) {
          return [...acc, valid.data];
        } else {
          return acc;
        }
      },
      [],
    );
    return { ...toplevelLogs, field_logos: validLogoLinks };
  }
}
