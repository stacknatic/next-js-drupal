import { DrupalNode } from "next-drupal";
import { drupal } from "./drupal-client";
import { EventCardSchema, EventCardType } from "../zod/event-card";

export async function validatedEventsTeaser(context) {
  const events = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--events",
    context,
    {
      params: {
        "filter[status]": 1,
        "filter[langcode]": context.locale,
        "fields[node--events]":
          "id,title,path,field_excerpt,field_start_date,field_image,field_organizers",
        include: "field_image,field_organizers",
        sort: "-field_start_date",
      },
    },
  );
  // validating each event based on EventCardSchema, if some event fails validation, that events will be left out and can not break the whole app
  const validatedEventsCards = events.reduce(
    (acc: EventCardType[], event: any) => {
      const validData = EventCardSchema.safeParse(event);
      if (validData.success) {
        return [...acc, validData.data];
      } else {
        return acc;
      }
    },
    [],
  );

  return validatedEventsCards;
}
