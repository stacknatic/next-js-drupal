import { z } from "zod";

export const WunderNumbersSchema = z.object({
  id: z.string(),
  field_topic: z.string(),
  field_number: z.string(),
});

export const TestimonialsSchema = z.object({
  id: z.string(),
  field_testimony: z.string(),
  field_testi_image: z.object({
    uri: z.object({
      url: z.string(),
    }),
    resourceIdObjMeta: z.object({
      alt: z.string(),
    }),
  }),
});

export const AboutPageBaseSchema = z.object({
  id: z.string(),
  field_mission_statement: z.string(),
  field_mission_description: z.string(),
  field_our_customers_description: z.string(),
  field_our_partners_descriptions: z.string(),
  field_wunder_numers: z.array(WunderNumbersSchema),
  field_testimonials: z.array(TestimonialsSchema),
});

// exporting types from schema

export type WunderNumbersType = z.infer<typeof WunderNumbersSchema>;
export type TestimonialsType = z.infer<typeof TestimonialsSchema>;
export type AboutPageBaseType = z.infer<typeof AboutPageBaseSchema>;

// function to validate and clean up data comes from drupal content type about_page.

export function aboutPageValidationCleanup(
  aboutPage: any,
): AboutPageBaseType | null {
  if (aboutPage) {
    const topLevelValidation = AboutPageBaseSchema.omit({
      field_wunder_numers: true,
      field_testimonials: true,
    }).safeParse(aboutPage);
    // data in array is being validated seperately, so that fail in one does not faild whole object.
    const validNumbers: WunderNumbersType[] =
      aboutPage.field_wunder_numers.reduce(
        (acc: WunderNumbersType[], number: any) => {
          const valid = WunderNumbersSchema.safeParse(number);
          if (valid.success) {
            return [...acc, valid.data];
          } else {
            return acc;
          }
        },
        [],
      );

    const validTestimonials: TestimonialsType[] =
      aboutPage.field_testimonials.reduce(
        (acc: TestimonialsType[], testi: any) => {
          const valid = TestimonialsSchema.safeParse(testi);
          if (valid.success) {
            return [...acc, valid.data];
          } else {
            return acc;
          }
        },
        [],
      );
    if (topLevelValidation.success)
      return {
        ...topLevelValidation.data,
        field_wunder_numers: validNumbers,
        field_testimonials: validTestimonials,
      };
  }
  return null;
}
