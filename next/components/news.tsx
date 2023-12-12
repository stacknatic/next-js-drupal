import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { FormattedText } from "@/components/formatted-text";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { HeadingPage } from "@/components/heading--page";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { News } from "@/lib/zod/news";
import TableOfContent from "./toc";
import AnchorNavigation from "./anchorNavigation";

interface NewsProps {
  news: News;
}

export function News({ news, ...props }: NewsProps) {
  const { t } = useTranslation();
  const router = useRouter();
  console.log('avatar', news.uid)
  return (
    <div {...props}>
      <Breadcrumbs
        items={[
          {
            title: t("news"),
            url: "/all-news",
          },
          {
            title: news.title,
          },
        ]}
      />
      <HeadingPage>{news.title}</HeadingPage> 
      {/* {news.field_excerpt && (
        <div className="my-4 text-xl">{news.field_excerpt}</div>
      )} */}
      <div className="mb-4 text-scapaflow">
        {/* {news.field_photo && (
          <Image
            src={absoluteUrl(news.field_photo.uri.url)}
            width={32}
            height={32}
            className="rounded-full"
            alt={news.field_photo.resourceIdObjMeta.alt}
          />
        )} */}
        {news.uid?.display_name && (
          <span>
            {t("posted-by", { author: news.uid?.display_name })} -{" "}
          </span>
        )}
        <span>{formatDate(news.created, router.locale)}</span>
      </div>
      {news.field_image && (
        <figure>
          <Image
            src={absoluteUrl(news.field_image.uri.url)}
            width={768}
            height={480}
            style={{ width: '100%', height: 'auto' }}
            alt={news.field_image.resourceIdObjMeta.alt}
            className="object-cover mx-auto rounded-lg"
            priority
          />
          {news.field_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-center text-sm text-scapaflow">
              {news.field_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}
        {news.field_anchor_nav && (
          <AnchorNavigation postContent={news.body?.processed} />
          )}
      {news.body?.processed && (
        <>
        <FormattedText
        className="mt-4 text-md/xl text-scapaflow sm:text-lg"
        html={news.body?.processed}
        />
        </>
      )}
    </div>
  );
}
