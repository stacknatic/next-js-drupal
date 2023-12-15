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
  // const author = article.uid?.display_name;
  const router = useRouter();
  const date = formatDate(article.created, router.locale);
  return (
    <Link
      href={article.path.alias}
      className="relative grid transition-all hover:shadow-md rounded-3xl mb-12 "
    >
      <div className="movingCard ">
        {article.field_image && (
          <Image
            src={absoluteUrl(article.field_image.uri.url)}
            width={384}
            height={240}
            alt={article.field_image.resourceIdObjMeta.alt}
            className="max-w-full object-cover mx-auto min-h-[40vh] lg:min-h-[400px] rounded-3xl brightness-50 hover:brightness-100 "
          />
        )}
        <div className="info absolute bottom-0 my-4 line-clamp-2 text-sm text-center text-white ">
          {/* {author && <>{t("posted-by", { author })} - </>} */}
          {date}
          <h3 className="mb-4 line-clamp-1 text-heading-xs font-bold text-center mx-4">
            {article.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
