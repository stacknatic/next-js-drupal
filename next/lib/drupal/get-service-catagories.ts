import { DrupalNode } from "next-drupal";
import { drupal } from "./drupal-client";
import { validateCleanupServiceCategoryData } from "../zod/service-categories";

export const getValidatedCleanServiceCategories = async (context: any) => {
  const service_categories = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--service_category", context, {
    params: {
      "filter[status]": 1,
      "filter[langcode]": context.locale,
      "fields[node--service_category]":
        "id,title,path,field_category_name,field_category_description,field_category_image",
      "fields[file--file]": "uri",
      include: "field_category_image",
    },
  });
  // validation and clean up service_categories data
  const validatedServiceCategories =
    validateCleanupServiceCategoryData(service_categories);
  return validatedServiceCategories;
};
