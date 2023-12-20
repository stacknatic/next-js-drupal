import { DrupalNode } from "next-drupal";
import { drupal } from "./drupal-client";
import { validateCleanupServiceData } from "../zod/services";

export const getValidatedCleanServices = async (context: any) => {
  const services = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--service",
    context,
    {
      params: {
        "filter[status]": 1,
        "filter[langcode]": context.locale,
        "fields[node--service]":
          "id,title,metatag,path,field_service_short_description,field_service_name,field_service_category,",
        "fields[node--service_category]": "field_category_name",
        include: "field_service_category",
      },
    },
  );
  // validation and clean up of fetched data
  const validatedCleanData = validateCleanupServiceData(services);
  return validatedCleanData;
};
