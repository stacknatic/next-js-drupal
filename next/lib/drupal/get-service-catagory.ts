import { DrupalNode } from "next-drupal";
import { drupal } from "./drupal-client";

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

  return service_categories;
};
