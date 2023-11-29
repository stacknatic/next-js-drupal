import Link from "next/link";
import { useTranslation } from "next-i18next";
import clsx from "clsx";

import { TheNewsTeaser } from "@/components/news/news-teaser";
import { NewsTeaser as NewsTeaserType } from "@/lib/zod/news-teaser";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { buttonVariants } from "@/ui/button";

interface LatestNewsProps {
  news?: NewsTeaserType[];
  heading: string;
}

export function NewsTeasers({ news, heading }: LatestNewsProps) {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="text-heading-sm font-bold md:text-heading-md">
        {heading}
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {news?.map((news) => (
          <li key={news?.id}>
            <TheNewsTeaser news={news} />
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center">
        {!news?.length && <p className="py-4">{t("no-content-found")}</p>}
        {news?.length && (
          <Link
            href="/all-news"
            className={clsx(
              buttonVariants({ variant: "primary" }),
              "text-base mr-4 mt-4 inline-flex px-5 py-3",
            )}
          >
            {t("all-news")}
            <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
          </Link>
        )}
      </div>
    </>
  );
}
