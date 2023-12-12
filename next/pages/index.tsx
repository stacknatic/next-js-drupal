import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";

import { ArticleTeasers } from "@/components/article/article-teasers";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import { Paragraph } from "@/components/paragraph";
import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { ArticleTeaser, validateAndCleanupArticleTeaser } from "@/lib/zod/article-teaser";
import { NewsTeasers } from "@/components/news/news-teasers";
import { NewsTeaser, validateAndCleanupNewsTeaser } from "@/lib/zod/news-teaser";
import { Frontpage, validateAndCleanupFrontpage } from "@/lib/zod/frontpage";
// import { Divider } from "@/ui/divider";
import Customers from "@/components/customers-partners/customers";
import { getValidatedCustomerLogos } from "@/lib/drupal/get-customer-logos";

import { EventTeasers } from "@/components/events/event-teasers";
import { CaseTeasers } from "@/components/cases/case-teasers";
import { validatedEventsTeaser } from "@/lib/drupal/get-event-teasers";
import { validatedCasesTeaser } from "@/lib/drupal/get-case-teasers";
import Canvas from "@/components/canvas";

interface IndexPageProps extends LayoutProps {
  frontpage: Frontpage | null;
  promotedArticleTeasers: ArticleTeaser[];
  promotedNewsTeasers: NewsTeaser[];
  validatedCustomerLogos: any;
  events: any;
  cases: any;
}

export default function IndexPage({
  frontpage,
  promotedArticleTeasers,
  promotedNewsTeasers,
  validatedCustomerLogos,
  events,
  cases,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();

  return (
    <>
      <Canvas />
      <Meta title={frontpage?.title} metatags={frontpage?.metatag} />
      <div className="grid gap-4">
        {frontpage?.field_content_elements?.map((paragraph) => (
          <Paragraph paragraph={paragraph} key={paragraph.id} />
        ))}
      </div>
      {/* <Divider className="max-w-4xl" /> */}
      <ArticleTeasers
        articles={promotedArticleTeasers}
        heading={t("promoted-articles")}
      />
      <EventTeasers events={events} heading={"Events"}/>
      <NewsTeasers news={promotedNewsTeasers} heading={"Recent News"} />
      <CaseTeasers cases={cases} heading={"Our latest work"}/>
      {/* <Divider className="max-w-4xl" /> */}
      <Customers validatedCustomerLogos={validatedCustomerLogos} />
    </>
  );
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async (
  context,
) => {
  const frontpage = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--frontpage",
      context,
      {
        params: getNodePageJsonApiParams("node--frontpage").getQueryObject(),
      },
    )
  ).at(0);

  const promotedArticleTeasers = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--article", context, {
    params: {
      "filter[status]": 1,
      "filter[langcode]": context.locale,
      "filter[promote]": 1,
      "fields[node--article]": "title,path,field_image,uid,created",
      include: "field_image,uid",
      sort: "-sticky,-created",
      "page[limit]": 3,
    },
  });
  const promotedNewsTeasers = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--news", context, {
    params: {
      "filter[status]": 1,
      "filter[langcode]": context.locale,
      "filter[promote]": 1,
      "fields[node--news]": "title,path,field_image,uid,created,field_anchor_nav",
      include: "field_image,uid",
      sort: "-sticky,-created",
      "page[limit]": 3,
    },
  });

  const validatedCustomerLogos = await getValidatedCustomerLogos(context);
  const validatedEventTeasers = await validatedEventsTeaser(context);
  const validatedCaseTeasers = await validatedCasesTeaser(context);

  return {
    props: {
      ...(await getCommonPageProps(context)),
      frontpage: frontpage ? validateAndCleanupFrontpage(frontpage) : null,
      promotedArticleTeasers: promotedArticleTeasers.map((teaser) =>
        validateAndCleanupArticleTeaser(teaser),
      ),
      promotedNewsTeasers: promotedNewsTeasers.map((teaser) =>
        validateAndCleanupNewsTeaser(teaser),
      ),
      
      validatedCustomerLogos: validatedCustomerLogos,
      events: validatedEventTeasers,
      cases: validatedCaseTeasers,
    },
    revalidate: 60,
  };
};
