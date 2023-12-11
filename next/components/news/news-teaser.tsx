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

export function NewsTeaser({ news }: NewsTeaserProps) {
  const { t } = useTranslation();
  const author = news.uid?.display_name;
  const router = useRouter();
  const date = formatDate(news.created, router.locale);
  return (
    <Link
      href={news.path.alias}
      className="relative grid transition-all hover:shadow-md rounded-3xl "
    >
    <div className="movingCard ">
      {news.field_image && (
        <Image
          src={absoluteUrl(news.field_image.uri.url)}
          width={384}
          height={240}
          alt={news.field_image.resourceIdObjMeta.alt}
          className="max-w-full object-cover mx-auto min-h-[30vh] lg:min-h-[50vh] rounded-3xl lg:brightness-50 hover:brightness-100 "
        />
      )}
      <div className="info lg:absolute lg:bottom-0  my-4 line-clamp-2 text-sm text-scapaflow text-center lg:text-white ">
        {author && <>{t("posted-by", { author })} - </>}
        {date}
        <h3 className="mb-4 line-clamp-1 text-heading-xs font-bold text-center mx-4">
        {news.title}
      </h3>
      </div>
    </div>
    </Link>
  );
}
