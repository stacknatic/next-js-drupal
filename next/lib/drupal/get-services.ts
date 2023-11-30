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
          "id,title,path,field_service_description,field_service_short_description,field_service_list,field_service_name,field_service_statement,field_service_category,field_service_image",
        "fields[node--service_category]": "field_category_name",
        "fields[file--file]": "uri",
        include: "field_service_category,field_service_image",
      },
    },
  );
  // validation and clean up of fetched data
  const validatedCleanData = validateCleanupServiceData(services);
  return validatedCleanData;
};
