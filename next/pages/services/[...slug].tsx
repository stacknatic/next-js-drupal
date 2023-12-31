import { Meta } from "@/components/meta";
import ServiceSingle from "@/components/services/service-single";
import {
  LanguageLinks,
  createLanguageLinks,
} from "@/lib/contexts/language-links-context";
import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { getNodeTranslatedVersions } from "@/lib/drupal/get-node-translated-versions";
import { getValidatedCleanServiceCategories } from "@/lib/drupal/get-service-catagories";
import { getValidatedCleanServices } from "@/lib/drupal/get-services";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { ServiceCategoryType } from "@/lib/zod/service-categories";
import { ServiceDataType, ServiceSchema } from "@/lib/zod/services";
import { GetStaticPaths, GetStaticProps } from "next";
import { DrupalNode } from "next-drupal";
import React from "react";

type ServicePageProps = {
  service: ServiceDataType;
  services: ServiceDataType[];
  serviceCategories: ServiceCategoryType[];
  // languageLinks: LanguageLinks;
};

export default function Service({
  service,
  services,
  serviceCategories,
}: ServicePageProps) {
  return (
    <>
      <Meta title={service.title} metatags={service.metatag} />
      <ServiceSingle
        service={service}
        services={services}
        serviceCategories={serviceCategories}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const paths = await drupal.getStaticPathsFromContext(
    "node--service",
    context,
  );
  return {
    paths: paths,
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const path = await drupal.translatePathFromContext(context, {
      pathPrefix: "/services",
    });
    if (!path) {
      return {
        notFound: true,
      };
    }
    const service = await drupal.getResourceFromContext<DrupalNode>(
      path,
      context,
      {
        params: getNodePageJsonApiParams("node--service").getQueryObject(),
      },
    );

    const valideService = ServiceSchema.parse(service);
    // const nodeTranslations = await getNodeTranslatedVersions(
    //   service,
    //   context,
    //   drupal,
    // );
    // const languageLinks = createLanguageLinks(nodeTranslations);
    const validatedServices = await getValidatedCleanServices(context);
    const validatedServiceCategories =
      await getValidatedCleanServiceCategories(context);
    return {
      props: {
        ...(await getCommonPageProps(context)),
        service: valideService,
        services: validatedServices,
        serviceCategories: validatedServiceCategories,
        // languageLinks,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
