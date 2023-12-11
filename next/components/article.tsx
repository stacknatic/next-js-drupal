import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { FormattedText } from "@/components/formatted-text";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { HeadingPage } from "@/components/heading--page";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { Article } from "@/lib/zod/article";
import TableOfContents from "./toc";
import avatar from '@/styles/avatar.module.css';
import RightSideBar from "./rightSidebar";
import ArticleLayout from "@/pages/layouts/articlesLayout";

interface ArticleProps {
  article: Article;
}

export function Article({ article, ...props }: ArticleProps) {
  const { t } = useTranslation();
  const router = useRouter();
  console.log("tags", article.field_tags)
  console.log("category", article.field_category)

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
      <HeadingPage>{article.title}</HeadingPage> 
      {article.field_excerpt && (
        <div className="my-4 text-xl">{article.field_excerpt}</div>
      )}
      <div className="mb-4 text-scapaflow flex align-middle gap-2 items-center">
        {article.uid?.field_user_avatar?.uri.url && (
          <Image src={absoluteUrl(article.uid?.field_user_avatar?.uri.url)} width={50} height={50} className={avatar.userAvatar} alt={article.uid?.display_name} />
          )}
        {article.uid?.display_name && (
          <span>
            {t("posted-by", { author: article.uid?.display_name })} -{" "}
          </span>
        )}
        <span>{formatDate(article.created, router.locale)}</span>

      </div>
      {article.field_image && (
        <figure>
          <Image
            src={absoluteUrl(article.field_image.uri.url)}
            width={768}
            height={480}
            style={{ width: '100%', height: 'auto' }}
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
          <TableOfContents postContent={article.body?.processed} />
          )}
      {article.body?.processed && (
        <FormattedText
          className="mt-4 text-md/xl text-scapaflow sm:text-lg"
          html={article.body?.processed}
        />
      )}
    </article>
  );
}
