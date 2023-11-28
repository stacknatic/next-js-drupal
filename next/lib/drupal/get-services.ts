import { DrupalNode } from "next-drupal";
import { drupal } from "./drupal-client";

export const getValidatedCleanServices = async (context: any) => {
  const services = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--services",
    context,
    {
      params: {
        "filter[status]": 1,
        "filter[langcode]": context.locale,
        "fields[node--services]": "id,title,path,",
        // include: "field_image,field_organizers",
      },
    },
  );

  return services;
};
