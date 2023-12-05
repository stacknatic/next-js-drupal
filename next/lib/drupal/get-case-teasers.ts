import { DrupalNode } from "next-drupal";
import { drupal } from "./drupal-client";
import { CaseCardSchema, CaseCardType } from "../zod/case-card";

export async function validatedCasesTeaser(context) {
  const cases = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--cases",
    context,
    {
      params: {
        "filter[status]": 1,
        "filter[langcode]": context.locale,
        "fields[node--cases]":
          "id,title,path,body,field_excerpt,field_logos,field_image",
         include: "field_logos.field_logo,field_image",
      },
    },
  );
  //validating each case based on CaseCardSchema, if some case fails validation, that cases will be left out and can not break the whole app
  const validatedCasesCards = cases.reduce(
    (acc: CaseCardType[], project: any) => {
      const validData = CaseCardSchema.safeParse(project);
      if (validData.success) {
        return [...acc, validData.data];
      } else {
        return acc;
      }
    },
    [],
  );

  return validatedCasesCards;
}
