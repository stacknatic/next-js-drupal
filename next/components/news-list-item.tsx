import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatShortDate } from "@/lib/utils";
import { NewsTeaser } from "@/lib/zod/news-teaser";

interface NewsListItemProps {
  news: NewsTeaser;
}

export function NewsListItem({ news }: NewsListItemProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const date = formatShortDate(news.created, router.locale);
  const imageUrl = news.field_image ? absoluteUrl(news.field_image.uri.url) : '';
  return (
    <div className="container mt-4 mb-10">
        <Link
          href={news.path.alias}
          className="parent"
        >
          <div
          className="card"
          style={{backgroundImage: `url(${imageUrl})`,}}
          >
            <div className="content-box">
              <h2 className="card-title">{news.title}</h2>
              <p className="card-content">{news.field_excerpt}</p>
            </div>
            <div className="date-box">
              {date && (
                <div className="top-[00px] left-[-2px] w-20 font-bold bg-transparent text-white p-1 flex-col items-center absolute">
                  <span className="text-xl">{date.day}</span>
                  <span className="date-month">{date.month}</span>
                </div>
              )}
            </div>
          </div>
        </Link>
    </div>
  );
}
