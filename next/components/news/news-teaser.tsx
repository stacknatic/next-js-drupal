import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { NewsTeaser } from "@/lib/zod/news-teaser";

interface NewsTeaserProps {
  news: NewsTeaser;
}

export function TheNewsTeaser({ news }: NewsTeaserProps) {
  const { t } = useTranslation();
  const author = news.uid?.display_name;
  const router = useRouter();
  const date = formatDate(news.created, router.locale);
  return (
    <Link
      href={news.path.alias}
      className="relative grid h-full rounded border border-finnishwinter bg-white p-4 transition-all hover:shadow-md"
    >
      <h3 className="mb-2 line-clamp-2 text-heading-xs font-bold">
        {news.title}
      </h3>
      <div className="mb-4 line-clamp-2 text-md text-scapaflow">
        {author && <>{t("posted-by", { author })} - </>}
        {date}
      </div>
      {news.field_image && (
        <Image
          src={absoluteUrl(news.field_image.uri.url)}
          width={384}
          height={240}
          alt={news.field_image.resourceIdObjMeta.alt}
          className="max-w-full object-cover"
        />
      )}
    </Link>
  );
}
