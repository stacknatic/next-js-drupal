import { z } from "zod";

export const BaseEventRegistrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email(),
  message: z.string(),
});

export const EventRegistrationSchema = BaseEventRegistrationSchema.extend({
  even_title: z.string(),
});
export type EventRegistrationInputType = z.infer<
  typeof BaseEventRegistrationSchema
>;
