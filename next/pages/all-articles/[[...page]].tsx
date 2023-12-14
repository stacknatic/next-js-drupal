import React, { useEffect, useRef, useState } from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { ArticleListItem } from "@/components/article-list-item";
import { HeadingPage } from "@/components/heading--page";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import { Pagination, PaginationProps } from "@/components/pagination";
import { createLanguageLinksForNextOnlyPage, LanguageLinks } from "@/lib/contexts/language-links-context";
import { getLatestArticlesItems } from "@/lib/drupal/get-articles";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { ArticleTeaser as ArticleTeaserType, validateAndCleanupArticleTeaser } from "@/lib/zod/article-teaser";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getArticleTags } from "@/lib/drupal/get-article-tags";
import { getArticleCategory } from "@/lib/drupal/get-category";
import { validateAndCleanupArticleTags } from "@/lib/zod/article-tags";
import { validateAndCleanupArticleCategory } from "@/lib/zod/article-category";
import { ArticleTags } from "@/lib/zod/article-tags";
import { ArticleCategory } from "@/lib/zod/article-category";
import { DropDownMenu } from "@/components/drop-down-menu";
import { useRouter } from "next/router";

interface AllArticlesPageProps extends LayoutProps {
  articleTeasers: ArticleTeaserType[];
  paginationProps: PaginationProps;
  languageLinks: LanguageLinks;
  articleTags: ArticleTags[];
  articleCategory: ArticleCategory[];
}

export default function AllArticlesPage({
  articleTeasers = [],
  paginationProps,
  articleTags = [],
  articleCategory = [],
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const focusRef = useRef<HTMLDivElement>(null);
  const [tag, setTag] = useState<string | null>(null);
  const [cat, setCat] = useState<string | null>(null);
  const [filteredArticles, setFilteredArticles] = useState<ArticleTeaserType[]>(articleTeasers);
  const router = useRouter();
  const { goToTag, goToCategory } = router.query;

  useEffect(() => {
    let articles = articleTeasers;
    
    if (tag) {
      // setCat(null);
      // goToCategory === null;
      articles = articleTeasers.filter((article) => {
        const tagNames = article.field_tags?.map((tag) => tag.name) || [];
        router.push({
          pathname: '/all-articles',
          query: { goToTag: tag },
        }, undefined, { shallow: true });
        return tagNames.includes(tag);
      });
    }

    setFilteredArticles(articles);
  }, [tag]);

  useEffect(() => {
    let articles = articleTeasers;
    
    if (goToTag) {
      // setCat(null);
      // goToCategory === null;
      articles = articleTeasers.filter((article) => {
        const tagNames = article.field_tags?.map((tag) => tag.name) || [];
        router.push({
          pathname: '/all-articles',
          query: { goToTag: (goToTag as string) },
        }, undefined, { shallow: true });
        return tagNames.includes((goToTag as string));
      });
    }

    setFilteredArticles(articles);
  }, [goToTag]);

  useEffect(() => {
    let articles = articleTeasers;
    
    if (cat) {
      // setTag(null);
      // goToTag === null;
      articles = articles.filter((article) => {
        const catName = article.field_category?.name || '';
        router.push({
          pathname: '/all-articles',
          query: { goToCategory: cat },
        }, undefined, { shallow: true });
        return catName.includes(cat);
      });
    }

    setFilteredArticles(articles);
  }, [cat]);

  useEffect(() => {
    let articles = articleTeasers;
    
    if (goToCategory) {
      // setTag(null);
      // goToTag === null;
      articles = articles.filter((article) => {
        const catName = article.field_category?.name || '';
        router.push({
          pathname: '/all-articles',
          query: { goToCategory: (goToCategory as string) },
        }, undefined, { shallow: true });
        return catName.includes((goToCategory as string));
      });
    }

    setFilteredArticles(articles);
  }, [goToCategory]);


  const handleTagFilter = (item: string) => {
    setTag(item);
  };

  const handleCatFilter = (item: string) => {
    setCat(item);
  };

  const tags = articleTags;
  const categories = articleCategory;

  return (
    <>
      <Meta title={t("all-articles")} metatags={[]} />
      <div ref={focusRef} tabIndex={-1} />
      <Breadcrumbs
        items={[
          {
            title: t("all-articles"),
          },
        ]}
      />
      <HeadingPage>{t("all-articles")}</HeadingPage>
      <div className="mt-4 mb-6">
        <span>Filter by: </span>

        <DropDownMenu name={"Category"} menuItems={categories} handleFilter={(item) => handleCatFilter(item)} />&nbsp;&nbsp;&nbsp;&nbsp;
        <DropDownMenu name={"Tags"} menuItems={tags} handleFilter={(item) => handleTagFilter(item)} />
      </div>
      <ul className="mt-4">
        {filteredArticles?.map((article) => (
          <li key={article?.id}>
            <ArticleListItem article={article} />
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

export const getStaticProps: GetStaticProps<AllArticlesPageProps> = async (context) => {
  const page = context.params.page;
  const currentPage = parseInt(Array.isArray(page) ? page[0] : page || "1");
  const PAGE_SIZE = 6;

  const { totalPages, articles } = await getLatestArticlesItems({
    limit: PAGE_SIZE,
    offset: currentPage ? PAGE_SIZE * (currentPage - 1) : 0,
    locale: context.locale,
  });

  const tags = await getArticleTags({
    locale: context.locale,
  });
  const categories = await getArticleCategory({
    locale: context.locale,
  });

  const prevEnabled = currentPage > 1;
  const nextEnabled = currentPage < totalPages;
  const pageRoot = "/all-articles";
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const prevPageHref =
    currentPage === 2
      ? pageRoot
      : prevEnabled && [pageRoot, prevPage].join("/");
  const nextPageHref = nextEnabled && [pageRoot, nextPage].join("/");

  const languageLinks = createLanguageLinksForNextOnlyPage(pageRoot, context);

  return {
    props: {
      ...(await getCommonPageProps(context)),
      articleTeasers: articles.map((teaser) =>
        validateAndCleanupArticleTeaser(teaser)
      ),

      articleTags: tags.map((tag) => validateAndCleanupArticleTags(tag)),
      articleCategory: categories.map((category) =>
        validateAndCleanupArticleCategory(category)
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
