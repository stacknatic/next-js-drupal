import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";
import { ContactList } from "@/components/contact-list";
import { LogoStrip } from "@/components/logo-strip";
// import { Meta } from "@/components/meta";
import { drupal } from "@/lib/drupal/drupal-client";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { EventsCards } from "@/components/events/events-cards";
import { EventCardSchema, EventCardType } from "@/lib/zod/event-card";

interface EventCardsPropsType {
  events: EventCardType[];
}

export default function Events({ events }: EventCardsPropsType) {
  const { t } = useTranslation();
  return (
    <>
      {/* <Meta title={events?.title} metatags={events?.metatag} /> */}
      <EventsCards events={events} heading={t("Events")} />
      <ContactList />
      <LogoStrip />
    </>
  );
}

export const getStaticProps: GetStaticProps<EventCardsPropsType> = async (
  context,
) => {
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

  return {
    props: {
      ...(await getCommonPageProps(context)),
      events: validatedEventsCards,
    },
    revalidate: 60,
  };
};
