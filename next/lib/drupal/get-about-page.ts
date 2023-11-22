import { DrupalNode } from "next-drupal";
import { drupal } from "./drupal-client";
import { aboutPageValidationCleanup } from "../zod/about-page";

export async function getValidatedCleanAboutPage(context) {
  // fetching data for about_page content type, there should be only one content of that type.
  const aboutPages = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--about_page", context, {
    params: {
      "filter[status]": 1,
      "fields[node--about_page]":
        "title,field_mission_statement,field_mission_description,field_our_customers_description,field_our_partners_descriptions,field_wunder_numers,field_testimonials",
      include: "field_wunder_numers,field_testimonials.field_testi_image",
    },
  });
  // only first element of about_page will be sent for clean up and validation and used in components
  const aboutPageFirstContent = aboutPages[0];
  // data will be valideated in two leves and returns the completed object.
  const validateAboutPage = aboutPageValidationCleanup(aboutPageFirstContent);
  return validateAboutPage;
}
