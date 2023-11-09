import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import CalenderIcon from "@/styles/icons/calendar.svg";
import BuildingIcon from "@/styles/icons/building.svg";
import { EventCardType } from "@/lib/zod/event-card";
interface EventsCardPropsType {
  event: EventCardType;
}

export function EventCard({ event }: EventsCardPropsType) {
  const { t } = useTranslation();
  const router = useRouter();
  const date = event.field_start_date
    ? formatDate(event.field_start_date, router.locale)
    : false;
  const organizers = event.field_organizers
    ? event.field_organizers.map((organizer) => (
        <li key={organizer.id} className="flex item-center gap-2">
          <BuildingIcon className="h-6 w-6 text-primary-400" />
          <span>{organizer.field_organizer_name}</span>
        </li>
      ))
    : false;
  return (
    <Link
      href={event.path.alias}
      className="grid h-full rounded-md border border-finnishwinter bg-white overflow-hidden transition-all hover:shadow-md relative"
    >
      {event.field_image && (
        <Image
          src={absoluteUrl(event.field_image.uri.url)}
          width={384}
          height={240}
          alt={event.field_image.resourceIdObjMeta.alt}
          className="w-full object-cover"
        />
      )}
      <h3 className=" justify-self-center self-center line-clamp-2 text-xl font-bold py-6 border-b">
        {event.title}
      </h3>
      <div className="grid gird-col-1 p-4">
        {/* only render if date is available */}
        {date && (
          <div className="py-2 flex items-center gap-x-2 absolute top-2 left-2 bg-graysuit px-2  rounded-full">
            <CalenderIcon className="h-6 w-6 text-primary-400" />
            <time>{date}</time>
          </div>
        )}
        {/* some event might not have organizers */}
        {organizers && <ul className="mb-4">{organizers}</ul>}
        {/* only render if filed avilable */}
        {event.field_excerpt && <p>{event.field_excerpt}</p>}
        <button className="content-end border h-14 py-3 bg-primary-100 rounded-full mt-4 hover:bg-primary-400  text-center">
          Lear more
        </button>
      </div>
    </Link>
  );
}
