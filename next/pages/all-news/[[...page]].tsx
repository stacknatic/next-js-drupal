import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { useRef } from "react";

import { NewsListItem } from "@/components/news-list-item";
import { HeadingPage } from "@/components/heading--page";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import { Pagination, PaginationProps } from "@/components/pagination";
import {
  createLanguageLinksForNextOnlyPage,
  LanguageLinks,
} from "@/lib/contexts/language-links-context";
import { getLatestNewsItems } from "@/lib/drupal/get-news";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import {
  NewsTeaser as NewsTeaserType,
  validateAndCleanupNewsTeaser,
} from "@/lib/zod/news-teaser";
import { Breadcrumbs } from "@/components/breadcrumbs";

interface AllNewsPageProps extends LayoutProps {
  newsTeasers: NewsTeaserType[];
  paginationProps: PaginationProps;
  languageLinks: LanguageLinks;
}

export default function AllNewsPage({
  newsTeasers = [],
  paginationProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const focusRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Meta title={t("All News")} metatags={[]} />
      <div ref={focusRef} tabIndex={-1} />
      <Breadcrumbs
        items={[
          {
            title: t("all-news")
          }
        ]}
      />
      <HeadingPage>{t("News")}</HeadingPage>
      <ul className="mt-4">
        {newsTeasers?.map((news) => (
          <li key={news.id}>
            <NewsListItem news={news} />
          </li>
        ))}
      </ul>
      <Pagination
        focusRestoreRef={focusRef}
        paginationProps={paginationProps}
      />
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { page: ["1"] },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<AllNewsPageProps> = async (
  context,
) => {
  // Get the page parameter:
  const page = context.params.page;
  const currentPage = parseInt(Array.isArray(page) ? page[0] : page || "1");
  const PAGE_SIZE = 6;

  const { totalPages, news } = await getLatestNewsItems({
    limit: PAGE_SIZE,
    offset: currentPage ? PAGE_SIZE * (currentPage - 1) : 0,
    locale: context.locale,
  });

  // Create pagination props.
  const prevEnabled = currentPage > 1;
  const nextEnabled = currentPage < totalPages;

  // Create links for prev/next pages.
  const pageRoot = "/all-news";
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const prevPageHref =
    currentPage === 2
      ? pageRoot
      : prevEnabled && [pageRoot, prevPage].join("/");
  const nextPageHref = nextEnabled && [pageRoot, nextPage].join("/");

  // Create language links for this page.
  // Note: the links will always point to the first page, because we cannot guarantee that
  // the other pages will exist in all languages.
  const languageLinks = createLanguageLinksForNextOnlyPage(pageRoot, context);

  return {
    props: {
      ...(await getCommonPageProps(context)),
      newsTeasers: news.map((teaser) =>
        validateAndCleanupNewsTeaser(teaser),
      ),
      paginationProps: {
        currentPage,
        totalPages,
        prevEnabled,
        nextEnabled,
        prevPageHref,
        nextPageHref,
      },
      languageLinks,
    },
    revalidate: 60,
  };
};
