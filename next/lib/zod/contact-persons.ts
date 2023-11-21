import { z } from "zod";

export const ContactPersonSchema = z.object({
  id: z.string(),
  field_contact_email: z.string().email().nullable(),
  field_contact_name: z.string(),
  field_contact_phone: z.string().nullable(),
  field_position: z.string(),
  field_contact_image: z.object({
    uri: z.object({
      url: z.string(),
    }),
    resourceIdObjMeta: z.object({
      alt: z.string(),
    }),
  }),
});

export const ContactPersonsSchema = z.object({
  type: z.literal("node--contact_persons"),
  title: z.string(),
  field_contact_person: z.array(ContactPersonSchema),
});

// exporting types from schema
export type ContactPersonType = z.infer<typeof ContactPersonSchema>;
export type ContactPersonsType = z.infer<typeof ContactPersonsSchema>;

export function contactPersonValidationCleanup(
  contact: any,
): ContactPersonsType {
  if (contact) {
    const toplevelValidContact = ContactPersonsSchema.omit({
      field_contact_person: true,
    }).parse(contact);
    // data in array is being validated seperately, so that fail in one does not faild whole object.
    const validPersons = contact.field_contact_person.reduce(
      (acc: ContactPersonType[], person: any) => {
        const valid = ContactPersonSchema.safeParse(person);
        if (valid.success) {
          return [...acc, valid.data];
        } else {
          return acc;
        }
      },
      [],
    );
    return { ...toplevelValidContact, field_contact_person: validPersons };
  }
}
