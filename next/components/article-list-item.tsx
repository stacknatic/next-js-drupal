import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import classNames from "classnames";

import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { ArticleTeaser } from "@/lib/zod/article-teaser";

interface ArticleListItemProps {
  article: ArticleTeaser;
}

export function ArticleListItem({ article }: ArticleListItemProps) {
  const { t } = useTranslation();
  // const author = article.uid?.display_name;
  const router = useRouter();
  const date = formatDate(article.created, router.locale);
  return (
    <Link
      href={article.path.alias}
      className={classNames(
        "relative mb-4 grid h-full rounded border  p-4 transition-all hover:shadow-md",
        article.sticky
          ? "border-primary-100 bg-primary-50"
          : "border-finnishwinter bg-white",
      )}
    >
      <h2 className="mb-2 line-clamp-2 text-heading-xs font-bold">
        {article.title}
      </h2>
      {article.field_category?.name && (
      <span className="mb-2">
        <span className="ring-1 rounded-sm p-1 bg-primary-500 text-white text-sm" key={article.field_category.id}>
        {article.field_category.name}
        </span>
      </span>

        )}



      {article.field_tags && (
        <span> {article.field_tags.map((tag) => (<span className="mr-1 ring-1 rounded-sm p-1 text-white text-xs bg-primary-400" key={tag.id}>{tag.name}</span>))}</span>
        
      )}
        
      <div className="mb-4 line-clamp-2 text-md text-scapaflow">
        {/* {author && <>{t("posted-by", { author })} - </>} */}
        {date}
      </div>
      <div className="flex flex-col items-start gap-4 sm:flex-row">
        {article.field_image && (
          <Image
            src={absoluteUrl(article.field_image.uri.url)}
            width={500}
            height={300}
            className="w-full sm:w-40 rounded-sm"
            alt={article.field_image.resourceIdObjMeta.alt}
          />
        )}
        <p>{article.field_excerpt}</p>
      </div>
    </Link>
  );
}
