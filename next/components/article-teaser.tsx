import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { ArticleTeaser } from "@/lib/zod/article-teaser";

interface ArticleTeaserProps {
  article: ArticleTeaser;
}

export function ArticleTeaser({ article }: ArticleTeaserProps) {
  const { t } = useTranslation();
  const author = article.uid?.display_name;
  const router = useRouter();
  const date = formatDate(article.created, router.locale);
  return (
    <Link
      href={article.path.alias}
      className="grid h-full p-4 transition-all hover:shadow-md"
    >
      {article.field_image && (
        <Image
          src={absoluteUrl(article.field_image.uri.url)}
          width={384}
          height={240}
          alt={article.field_image.resourceIdObjMeta.alt}
          className="max-w-full object-cover mx-auto"
        />
      )}
      <div className="my-4 line-clamp-2 text-sm text-scapaflow text-center">
        {author && <>{t("posted-by", { author })} - </>}
        {date}
      </div>
      <h3 className="mb-2 line-clamp-1 text-heading-xs font-bold text-center">
        {article.title}
      </h3>
      
    </Link>
  );
}
