import { useTranslation } from "next-i18next";
import { EventCard } from "@/components/events/events-card";
import { Breadcrumbs } from "../breadcrumbs";
import { EventCardType } from "@/lib/zod/event-card";

interface EventsCardsPropsType {
  events: EventCardType[];
  heading: string;
}

export function EventsCards({ events, heading }: EventsCardsPropsType) {
  const { t } = useTranslation();
  return (
    <div className="md:px-16">
      <Breadcrumbs
        items={[
          {
            title: t("events"),
          },
        ]}
      />
      <h1 className="text-[4rem] text-center md:text-left py-16">
        {heading}
      </h1>
      <ul className="lg:flex lg:flex-wrap mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {events?.map((event) => (
          <li key={event.id}>
            <EventCard event={event} />
          </li>
        ))}
      </ul>
    </div>
  );
}
