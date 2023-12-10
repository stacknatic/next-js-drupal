import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { HeadingPage } from "../heading--page";
import Image from "next/image";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { FormattedText } from "../formatted-text";
import EventProfile from "./event-profile";
import CalenderIcon from "@/styles/icons/calendar.svg";
import { Breadcrumbs } from "../breadcrumbs";
import { EventSingleType } from "@/lib/zod/event-single";
import { EventRegistration } from "../event-registration";

function EventSingle({ event }: { event: EventSingleType }) {
  const { t } = useTranslation();
  const router = useRouter();
  const date = event.field_start_date
    ? formatDate(event.field_start_date, router.locale)
    : false;

  return (
    <article className="grid md:grid-cols-2 md:gap-1 gap-2 px-4">
      <div className="grid grid-cols-1 content-start h-full rounded-md  overflow-hidden transition-all row-span-2">
        <Breadcrumbs
          items={[
            {
              title: t("events"),
              url: "/events",
            },
            {
              title: event.title,
            },
          ]}
        />
        <h2 className="text-heading-lg font-bold">{event.title}</h2>
        {date && (
          <div className="text-xl  flex items-center gap-x-2 mt-4">
            <CalenderIcon className="h-6 w-6 text-primary-400" />
            <time>{date}</time>
          </div>
        )}
        {event.field_organizers.length > 0 && (
          <div className=" mb-4 md:mb-8">
            {/* some event might not have organizers */}
            <h3 className="text-heading-sm mt-8 ">Organizers</h3>
            <ul className="text-heading-xs mt-4">
              <EventProfile profiles={event.field_organizers} />
            </ul>
          </div>
        )}

        {event.field_speakers.length > 0 && (
          <div className=" mb-4 md:mb-8">
            {/* some event might not have organizers */}
            <h3 className="text-heading-sm mt-8 ">Speakers</h3>
            <ul className="text-heading-xs mt-4">
              <EventProfile profiles={event.field_speakers} />
            </ul>
          </div>
        )}

        <EventRegistration eventTitle={event.title} />
      </div>
      {event.field_image && (
        <Image
          src={absoluteUrl(event.field_image.uri.url)}
          width={384}
          height={240}
          alt={event.field_image.resourceIdObjMeta.alt}
          className="w-full object-cover rounded-md"
        />
      )}
      {event.body && (
        <FormattedText
          className="mt-4 text-md/xl text-scapaflow sm:text-lg "
          html={event.body.processed}
        />
      )}
    </article>
  );
}

export default EventSingle;
