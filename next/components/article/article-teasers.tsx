import Link from "next/link";
import { useTranslation } from "next-i18next";
import clsx from "clsx";

import { ArticleTeaser } from "@/components/article/article-teaser";
import { ArticleTeaser as ArticleTeaserType } from "@/lib/zod/article-teaser";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { buttonVariants } from "@/ui/button";

interface LatestArticlesProps {
  articles?: ArticleTeaserType[];
  heading: string;
}

export function ArticleTeasers({ articles, heading }: LatestArticlesProps) {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="text-heading-sm font-bold md:text-heading-md mb-6 text-white">
        {heading}
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 text-white">
        {articles?.map((article) => (
          <li key={article?.id}>
            <ArticleTeaser article={article} />
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-start mb-24">
        {!articles?.length && <p className="py-4">{t("no-content-found")}</p>}
        {articles?.length && (
          <Link
            href="/all-articles"
            className={clsx(
              buttonVariants({ variant: "primary" }),
              "text-base mr-4 my-5 inline-flex px-5 py-3 rounded-full border-white",
            )}
          >
            {t("all-articles")}
            <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
          </Link>
        )}
      </div>
    </>
  );
}
