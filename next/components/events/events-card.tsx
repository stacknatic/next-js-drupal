import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { ArticleTeaser } from "@/lib/zod/article-teaser";

interface ArticleTeaserProps {
  article: ArticleTeaser;
}

export function EventCard({ event }: ArticleTeaserProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const date = formatDate(event.field_start_date, router.locale);
  const organizers =
    event.field_organizers.length > 0
      ? event.field_organizers.map((organizer) => (
          <li key={organizer.id} className="flex item-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="blue"
              className="w-7 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
              />
            </svg>
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
        <div className="py-2 flex items-center gap-x-2 absolute top-2 left-2 bg-primary-200 px-2  rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="blue"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>

          <time>{date}</time>
        </div>
        {/* some event might not have organizers */}
        {organizers && <ul className="mb-4">{organizers}</ul>}
        <p>{event.field_excerpt}</p>
        <button className="border py-3 bg-primary-100 rounded-full mt-4 hover:bg-primary-400  text-center">
          Lear more
        </button>
      </div>
    </Link>
  );
}
