import { DrupalNode } from "next-drupal";
import { drupal } from "./drupal-client";
import { validateCleanupServiceData } from "../zod/services";
import { validateCleanupServiceLandingPage } from "../zod/service-landing-page";

export const getValidatedCleanServicesLandingPage = async (context: any) => {
  const service_landing_page = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--service_landing_page", context, {
    params: {
      "filter[status]": 1,
      "filter[langcode]": context.locale,
      "fields[node--service_landing_page]":
        "id,field_page_title,field_service_page_statement,field_wunder_working_strategy",
      "fields[paragraph--wunder_working_strategy]":
        "id,field_strategies,field_strategy_group_heading",
      "fields[paragraph--heading_description]":
        "id,field_heading_desc_heading,field_heading_desc_description",
      include: "field_wunder_working_strategy.field_strategies",
    },
  });
  // validation and clean up of fetched data
  const valid = validateCleanupServiceLandingPage(service_landing_page[0]);
  return valid;
};
