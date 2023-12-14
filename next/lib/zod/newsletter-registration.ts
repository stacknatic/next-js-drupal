import { z } from "zod";

export const NewsletterRegistrationSchema = z.object({
  email: z.string().min(1, "Email address is required").email(),
  privacy: z.boolean().refine((bool) => bool === true, {
    message: "Data consent is required",
  }),
  news: z.boolean().or(z.string()),
  careers: z.boolean().or(z.string()),
  events: z.boolean().or(z.string()),
});

export type NewsletterRegistrationType = z.infer<
  typeof NewsletterRegistrationSchema
>;
