import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { NewsTeaser as NewsTeaserType } from "@/lib/zod/news-teaser";

interface NewsTeaserProps {
  news: NewsTeaserType;
}

export function NewsTeaser({ news }: NewsTeaserProps) {
  const { t } = useTranslation();
  // commenting out the following line because uid is not part of news
  // const author = news.uid?.display_name;
  const router = useRouter();
  const date = formatDate(news.created, router.locale);
  return (
    <Link
      href={news.path.alias}
      className="relative grid transition-all hover:shadow-md rounded-3xl mb-12 "
    >
      <div className="movingCard ">
        {news.field_image && (
          <Image
            src={absoluteUrl(news.field_image.uri.url)}
            width={384}
            height={240}
            alt={news.field_image.resourceIdObjMeta.alt}
            className="max-w-full object-cover mx-auto min-h-[40vh] lg:min-h-[400px] rounded-3xl brightness-50 hover:brightness-100 "
          />
        )}
        <div className="info absolute bottom-0 my-4 line-clamp-2 text-sm text-center text-white w-webkit-fill-available">
          {/* commenting out the following line because uid is not part of news */}
          {/* {author && <>{t("posted-by", { author })} - </>} */}
          {date}
          <h3 className="mb-4 line-clamp-1 text-heading-xs font-bold text-center mx-4">
            {news.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
