import Link from "next/link";
import { useTranslation } from "next-i18next";
import clsx from "clsx";

import { EventTeaser } from "@/components/events/event-teaser";
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
      <h2 className="md:my-20 text-heading-sm font-bold md:text-heading-md my-10 text-center md:text-left">
        {heading}
      </h2>
      <ul className="mt-4 grid grid-cols-1 lg:gap-10 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:h-500 ">
        {events?.slice(0, 3).map((event, index) => (
          <li key={index + event.title}>
            <EventTeaser event={event} />
          </li>
        ))}
      </ul>
      <div className="flex items-center lg:justify-start justify-center lg:mb-[-50px]">
        {!events?.length && <p className="py-4">{t("no-content-found")}</p>}
        {events?.length && (
          <Link
            href="/events"
            className={clsx(
              buttonVariants({ variant: "primary" }),
              "text-base font-bold lg:my-10 mt-2 mb-4 inline-flex px-5 py-3 rounded-full border-white",
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
