import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";

import { ArticleTeasers } from "@/components/article-teasers";
import { ContactForm } from "@/components/contact-form";
import { ContactList } from "@/components/contact-list";
import { LayoutProps } from "@/components/layout";
import { LogoStrip } from "@/components/logo-strip";
import { Meta } from "@/components/meta";
import { Paragraph } from "@/components/paragraph";
import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import {
  ArticleTeaser,
  validateAndCleanupArticleTeaser,
} from "@/lib/zod/article-teaser";
import { Frontpage, validateAndCleanupFrontpage } from "@/lib/zod/frontpage";

import { Divider } from "@/ui/divider";
import { EventsCards } from "@/components/events/events-cards";

interface IndexPageProps extends LayoutProps {
  promotedArticleTeasers: ArticleTeaser[];
}

export default function Events({ events }) {
  const { t } = useTranslation();

  console.log(events);
  return (
    <>
      <h1>Hello from events</h1>
      {/* <Meta title={frontpage?.title} metatags={frontpage?.metatag} /> */}

      {/* <EventsCards
        articles={promotedArticleTeasers}
        heading={t("promoted-articles")}
      /> */}
      {/* <ContactList /> */}
      {/* <LogoStrip /> */}
    </>
  );
}

export const getStaticProps = async (context) => {
  const events = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--events",
    context,
    {
      params: {
        "filter[status]": 1,
        "filter[langcode]": context.locale,
        "fields[node--events]":
          "title,path,body,field_start_date,field_image,uid",
        include: "field_image,uid",
        sort: "-field_start_date",
      },
    },
  );

  return {
    props: {
      ...(await getCommonPageProps(context)),
      events: events,
    },
    revalidate: 60,
  };
};
