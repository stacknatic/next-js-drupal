import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { FormattedText } from "@/components/formatted-text";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { HeadingPage } from "@/components/heading--page";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { Article as ArticleType } from "@/lib/zod/article";
import AnchorNavigation from "./anchorNavigation";
import avatar from "@/styles/avatar.module.css";
import Link from "next/link";

interface ArticleProps {
  article: ArticleType;
}

export function Article({ article, ...props }: ArticleProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <article {...props}>
      <Breadcrumbs
        items={[
          {
            title: t("articles"),
            url: "/all-articles",
          },
          {
            title: article.title,
          },
        ]}
      />
      {article.field_category && (
        <span>
          Category:
          <span className="ml-2 mr-1" key={article.field_category.id}>
            <Link
              href={`/all-articles?goToCategory=${article.field_category.name}`}
              className="ring-1 rounded-sm p-1 bg-primary-500 text-white text-xs"
            >
              {article.field_category.name}
            </Link>
          </span>
        </span>
      )}

      {article.field_tags && (
        <div className="mt-1">
          <span>
            Tags:
            {article.field_tags.map((tag) => (
              <span className="ml-2 mr-1" key={tag.id}>
                <Link
                  href={`/all-articles?goToTag=${tag.name}`}
                  className="text-primary-500"
                >
                  {tag.name}
                </Link>
              </span>
            ))}
          </span>
        </div>
      )}
      <HeadingPage>{article.title}</HeadingPage>
      {article.field_excerpt && (
        <div className="my-4 text-xl">{article.field_excerpt}</div>
      )}
      <div className="mb-4 text-scapaflow flex flex-wrap align-middle gap-1 items-center">
        {article.uid?.field_user_avatar?.uri.url && (
          <Image
            src={absoluteUrl(article.uid?.field_user_avatar?.uri.url)}
            width={50}
            height={50}
            className={avatar.userAvatar}
            alt={article.uid?.display_name}
          />
        )}
        {article.uid?.display_name && (
          <span>
            {t("posted-by", { author: article.uid?.display_name })} -{" "}
          </span>
        )}
          <span> Published on: {formatDate(article.created, router.locale)}</span>
          {article.changed && (
          <span>| Updated on: {formatDate(article.changed, router.locale)}</span>
        )
        }

      </div>
      {article.field_image && (
        <figure>
          <Image
            src={absoluteUrl(article.field_image.uri.url)}
            width={768}
            height={480}
            style={{ width: "100%", height: "auto" }}
            alt={article.field_image.resourceIdObjMeta.alt}
            className="object-cover mx-auto rounded-lg"
            priority
          />
          {article.field_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-center text-sm text-scapaflow">
              {article.field_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}
      {article.field_anchor_nav && (
        <AnchorNavigation postContent={article.body?.processed} />
      )}
      {article.body && (
        <FormattedText
          className="mt-4 text-md/xl text-scapaflow sm:text-lg"
          html={article.body?.processed}
        />
      )}
    </article>
  );
}
