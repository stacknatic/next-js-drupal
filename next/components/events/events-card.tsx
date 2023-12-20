import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate, formatShortDate } from "@/lib/utils";
import CalenderIcon from "@/styles/icons/calendar.svg";
import BuildingIcon from "@/styles/icons/building.svg";
import { EventCardType } from "@/lib/zod/event-card";
interface EventsCardPropsType {
  event: EventCardType;
}

export function EventCard({ event }: EventsCardPropsType) {
  const { t } = useTranslation();
  const router = useRouter();
  const longDate = event.field_start_date
    ? formatDate(event.field_start_date, router.locale)
    : false;
  const shortDate = event.field_start_date
    ? formatShortDate(event.field_start_date, router.locale)
    : false;
  const organizers = event.field_organizers
    ? event.field_organizers.map((organizer) => (
        <li key={organizer.id} className="flex item-center gap-2 lg:pb-2">
          <BuildingIcon className="h-6 w-6 text-primary-400" />
          <span>{organizer.field_organizer_name}</span>
        </li>
      ))
    : false;
  return (
    <Link
      href={event.path.alias}
      className="eventFull lg:flex justify-center lg:w-[976px] grid lg:h-[650px] lg:mb-10 h-full rounded-xl  bg-white overflow-hidden transition-all hover:shadow-md relative"
    >
      <div className="eventImageWrapper w-full">
        {event.field_image && (
          <Image
            src={absoluteUrl(event.field_image.uri.url)}
            width={384}
            height={240}
            alt={event.field_image.resourceIdObjMeta.alt}
            className="eventImage w-full rounded-xl"
          />
        )}
      </div>
      <div className="eventInfo lg:z-10 lg:bg-white lg:min-h-[265px] lg:rounded-xl lg:shadow-md lg:mx-8 lg:absolute lg:top-[350px] grid gird-col-1 p-4">
        <h2 className=" justify-self-center self-center line-clamp-2 text-xl font-bold py-6 border-b">
          {event.title}
        </h2>
        {/* only render if date is available */}
        {longDate && (
          <div className="dateBox longDate lg:hidden p-4 flex items-center gap-x-2 absolute top-4 left-4 bg-white rounded-full">
            <CalenderIcon className="h-6 w-6 text-primary-400" />
            <time>{longDate}</time>
          </div>
        )}
        {shortDate ? (
          <div className="dateBox shortDate top-[-200px] left-[425px] w-16 border-4 bg-transparent text-white p-1 flex-col items-center absolute">
            <span className="text-xl">{shortDate.day}</span>
            <span className="date-month">{shortDate.month}</span>
          </div>
        ) : (
          <div className="dateBox shortDate top-[-200px] left-[525px] w-16 border-4 bg-transparent text-white p-4 flex-col items-center absolute">
            <span className="">SOON</span>
          </div>
        )}
        {/* some event might not have organizers */}
        {organizers && <ul className="mb-4 lg:px-20">{organizers}</ul>}
        {/* only render if filed avilable */}
        {event.field_excerpt && (
          <p className="lg:px-20 lg:pb-6">{event.field_excerpt}</p>
        )}
        {/* <button className="content-end border h-14 py-3 bg-primary-100 rounded-full mt-4 hover:bg-primary-400  text-center">
          Lear more
        </button> */}
      </div>
    </Link>
  );
}
