import Link from "next/link";
import { useTranslation } from "next-i18next";
import clsx from "clsx";

import { EventCard } from "@/components/events/events-card";
import { ArticleTeaser as ArticleTeaserType } from "@/lib/zod/article-teaser";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { buttonVariants } from "@/ui/button";

interface LatestArticlesProps {
  articles?: ArticleTeaserType[];
  heading: string;
}

export function EventsCards({ events, heading }) {
  const { t } = useTranslation();
  return (
    <div className="grid justify-center">
      <h2 className="pb-6 md:pb-8 text-center text-heading-sm font-bold md:text-heading-md">
        {heading}
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {events?.map((event) => (
          <li key={event.id}>
            <EventCard event={event} />
          </li>
        ))}
      </ul>
    </div>
  );
}
