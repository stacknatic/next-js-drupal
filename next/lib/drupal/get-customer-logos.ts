import { DrupalNode } from "next-drupal";
import { drupal } from "./drupal-client";
import { logosLinksValidationCleanup } from "../zod/customer-partners-logos";

export async function getValidatedCustomerLogos(context) {
  // fetching data for customer_logos content type, there should be only one content of that type.
  const logos = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--customer_logos",
    context,
    {
      params: {
        "filter[status]": 1,
        "fields[node--customer_logos]": "title,field_logos",
        include: "field_logos.field_logo",
      },
    },
  );
  // only first element of logos will se sent for clean up and validation and used in components
  const logo = logos[0];
  // data will be valideated in two leves and returns the completed object.
  const validatedLogos = logosLinksValidationCleanup(logo);
  return validatedLogos;
}
