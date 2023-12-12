import Link from "next/link";
import { useTranslation } from "next-i18next";
import clsx from "clsx";

import { EventTeaser } from "@/components/events/event-teaser";
// import { ArticleTeaser as ArticleTeaserType } from "@/lib/zod/article-teaser";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { buttonVariants } from "@/ui/button";



// interface LatestEventsProps {
//   events?: ArticleTeaserType[];
//   heading: string;
// }

export function EventTeasers({ events, heading }: any) {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="text-heading-sm font-bold md:text-heading-md my-10">
        {heading}
      </h2>
      <ul className="mt-4 grid grid-cols-1 lg:gap-10 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:h-500">
        {events?.slice(0, 3).map((event) => (
          <li key={event}>
            <EventTeaser event={event} />
          </li>
        ))}
      </ul>
      <div className="flex items-center lg:justify-start lg:mb-24">
        {!events?.length && <p className="py-4">{t("no-content-found")}</p>}
        {events?.length && (
          <Link
            href="/events"
            className={clsx(
              buttonVariants({ variant: "primary" }),
              "text-base lg:my-10 mt-0 mb-4 inline-flex px-5 py-3 rounded-full border-white",
            )}
          >
            {t("All-events")}
            <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
          </Link>
        )}
      </div>
    </>
  );
}
