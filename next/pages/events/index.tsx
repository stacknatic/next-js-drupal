import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { ContactList } from "@/components/contact-list";
import { LogoStrip } from "@/components/logo-strip";
// import { Meta } from "@/components/meta";
import { drupal } from "@/lib/drupal/drupal-client";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { EventsCards } from "@/components/events/events-cards";
import { EventCardType } from "@/lib/zod/event-card";
import { validatedEventsTeaser } from "@/lib/drupal/get-event-teasers";

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
  try {
    // data fetching is abstracted, so that only "validatedEventsTeaser" function call will return events teasers data. In this way we can call the fucntion in other routes when we needed it.
    const validatedEventTeasers = await validatedEventsTeaser(context);
    return {
      props: {
        ...(await getCommonPageProps(context)),
        events: validatedEventTeasers,
      },
      revalidate: 60,
    };
  } catch (err) {
    return { notFound: true };
  }
};
