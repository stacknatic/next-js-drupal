import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import classNames from "classnames";

import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { NewsTeaser } from "@/lib/zod/news-teaser";

interface NewsListItemProps {
  news: NewsTeaser;
}

export function NewsListItem({ news }: NewsListItemProps) {
  const { t } = useTranslation();
  const author = news.uid?.display_name;
  const router = useRouter();
  const date = formatDate(news.created, router.locale);
  return (
    <Link
      href={news.path.alias}
      className={classNames(
        "relative mb-4 grid h-full rounded border  p-4 transition-all hover:shadow-md",
        news.sticky
          ? "border-primary-100 bg-primary-50"
          : "border-finnishwinter bg-white",
      )}
    >
      <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold">
        {news.title}
      </h3>
      <div className="mb-4 line-clamp-2 text-md text-scapaflow">
        {author && <>{t("posted-by", { author })} - </>}
        {date}
      </div>
      <div className="flex flex-col items-start gap-4 sm:flex-row">
        {news.field_image && (
          <Image
            src={absoluteUrl(news.field_image.uri.url)}
            width={500}
            height={300}
            className="w-full sm:w-40"
            alt={news.field_image.resourceIdObjMeta.alt}
          />
        )}
        <p>{news.field_excerpt}</p>
      </div>
    </Link>
  );
}
