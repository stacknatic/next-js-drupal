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
import { CSSProperties } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import { set } from "cypress/types/lodash";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  fontSize: "1.2rem",
};

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
  const [all, setAll] = useState<string | null>(null);
  const [filteredArticles, setFilteredArticles] = useState<ArticleTeaserType[]>(articleTeasers);

  const router = useRouter();
  const { goToTag, goToCategory } = router.query;
  
  const [visibleArticles, setVisibleArticles] = useState(3);
  const [loading, setLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const containerRef = useRef(null);

  const resetFilters = () => {
    setAll(null);
    setCat(null);
    setTag(null);
  }

  const applyFilter = (filter: string, fieldValue: string) => {
    let articles = articleTeasers;
  
    if (!fieldValue) return articles;
    if(fieldValue === "all"){
      resetFilters();   
      return articles;
    };

    if (filter === "field_tags") {
      resetFilters();
      router.push({
        pathname: '/all-articles',
      });
      articles = articleTeasers.filter((article) => {
        let tagNames = article.field_tags?.map((tag) => tag.name) || [];
        return tagNames.includes(fieldValue);
      });
    } else if (filter === "field_category") {
      resetFilters();
      router.push({
        pathname: '/all-articles',
      });
      articles = articleTeasers.filter((article) => {
        let catName = article.field_category?.name || '';
        return catName.includes(fieldValue);
      });
    }
    setFilteredArticles(articles);
  }

  useEffect(() => {
    applyFilter('all_articles', all);
  }, [all]);

  useEffect(() => {
    applyFilter('field_tags', tag || goToTag as string);
  }, [tag, goToTag]);

  useEffect(() => {
    applyFilter('field_category', cat || goToCategory as string);
  }, [cat, goToCategory]);
  

  
  const tags = articleTags;
  const categories = articleCategory;


  useEffect(() => {
    const handleScroll = () => {
      if (
        canLoadMore &&
        containerRef.current &&
        window.innerHeight + window.scrollY >=
          containerRef.current.offsetTop + containerRef.current.offsetHeight * 0.9
      ) {
        setLoading(true);
        setCanLoadMore(false);

        setTimeout(() => {
          let remainingArticles = filteredArticles.length - visibleArticles;
          let articlesToLoad = remainingArticles >= 3 ? 3 : remainingArticles;
          setVisibleArticles(visibleArticles + articlesToLoad);

          if (visibleArticles < filteredArticles.length) {
            setCanLoadMore(true);
          } else {
            return null;
          }          
        }, 1000);

        setCanLoadMore(false);
      }
      if (visibleArticles === filteredArticles.length) {
        setLoading(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleArticles, canLoadMore, filteredArticles]);

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
      <HeadingPage>{t("Articles")}</HeadingPage>
      <div className="mt-4 mb-6 flex items-center">
        <span>Filter by: </span>
        <span className="mr-5 ml-1">
        <DropDownMenu name={"Category"} menuItems={categories} handleFilter={(item: string) => setCat(item)}/>
        </span>
        <DropDownMenu name={"Tags"} menuItems={tags} handleFilter={(item: string) => setTag(item) } />
        <button onClick={() => setAll("all category")} className="ml-3 p-2 z-10 rounded-md bg-white shadow-md ring-1 ring-opacity-5 ring-inset">All</button>

      </div>
      <ul className="mt-4" ref={containerRef}>
        {filteredArticles?.slice(0, visibleArticles)
        .map((article) => (
          <li key={article?.id}>
            <ArticleListItem article={article} />
          </li>
        ))}
      </ul>
      {loading && (
        <span className="text-primary-500">

        <FadeLoader
         loading={loading}
         cssOverride={override}
        //  size={45}
         aria-label="Loading Spinner"
         data-testid="loader"
         color= {"#653cc5"}
         />
        </span>
      )}
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
  const PAGE_SIZE = 3;

  const { totalPages, articles } = await getLatestArticlesItems({
    limit: 1000,
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
      },
      languageLinks,
    },
    revalidate: 60,
  };
};