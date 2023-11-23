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
import { Frontpage, validateAndCleanupFrontpage } from "@/lib/zod/frontpage";
import { Divider } from "@/ui/divider";
import CustomersPartners from "@/components/customers-partners/customers-partners";
import { getValidatedCustomerLogos } from "@/lib/drupal/get-customer-logos";
import { getValidatedPartnerLogos } from "@/lib/drupal/get-partner-logos";

import { EventTeasers } from "@/components/events/event-teasers";

interface IndexPageProps extends LayoutProps {
  frontpage: Frontpage | null;
  promotedArticleTeasers: ArticleTeaser[];
  validatedCustomerLogos: any;
  validatedPartnerLogos: any;
}

export default function IndexPage({
  frontpage,
  promotedArticleTeasers,
  validatedCustomerLogos,
  validatedPartnerLogos,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();

  return (
    <>
      
      <Meta title={frontpage?.title} metatags={frontpage?.metatag} />
      <div className="grid gap-4">
        {frontpage?.field_content_elements?.map((paragraph) => (
          <Paragraph paragraph={paragraph} key={paragraph.id} />
        ))}
      </div>
      <Divider className="max-w-4xl" />
      <ArticleTeasers
        articles={promotedArticleTeasers}
        heading={t("promoted-articles")}
      />
      <EventTeasers/>
      <Divider className="max-w-4xl" />
      <CustomersPartners
        validatedCustomerLogos={validatedCustomerLogos}
        validatedPartnerLogos={validatedPartnerLogos}
        />
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

  const validatedCustomerLogos = await getValidatedCustomerLogos(context);
  const validatedPartnerLogos = await getValidatedPartnerLogos(context);

  return {
    props: {
      ...(await getCommonPageProps(context)),
      frontpage: frontpage ? validateAndCleanupFrontpage(frontpage) : null,
      promotedArticleTeasers: promotedArticleTeasers.map((teaser) =>
        validateAndCleanupArticleTeaser(teaser),
      ),
      validatedCustomerLogos: validatedCustomerLogos,
      validatedPartnerLogos: validatedPartnerLogos,
    },
    revalidate: 60,
  };
};
