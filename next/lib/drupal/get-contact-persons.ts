import { DrupalNode } from "next-drupal";
import { drupal } from "./drupal-client";
import { contactPersonValidationCleanup } from "../zod/contact-persons";

export async function getValidatedContactPersons(context) {
  // fetching data for contact_persons content type, there should be only one content of that type.
  const constacts = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--contact_persons",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[node--contact_persons]": "title,field_contact_person",
        include: "field_contact_person.field_contact_image",
      },
    },
  );
  // only first element of contact_persons will be sent for clean up and validation and used in components
  const constact = constacts[0];
  // data will be valideated in two leves and returns the completed object.
  const validatedContact = contactPersonValidationCleanup(constact);
  return validatedContact;
}
