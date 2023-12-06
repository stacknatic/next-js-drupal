import React from "react";
import { GetStaticProps } from "next";
import { getValidatedCleanServices } from "@/lib/drupal/get-services";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { getValidatedCleanServiceCategories } from "@/lib/drupal/get-service-catagories";
import ServicePage from "@/components/services/service-page";
import { ServiceDataType } from "@/lib/zod/services";
import { ServiceCategoryType } from "@/lib/zod/service-categories";
import { getValidatedCleanServicesLandingPage } from "@/lib/drupal/get-service-landing-page";
import { ServiceLandingPageType } from "@/lib/zod/service-landing-page";

type ServicesPropType = {
  services: ServiceDataType[];
  serviceCategories: ServiceCategoryType[];
  serviceLandingPage: ServiceLandingPageType;
};

export default function Services({
  services,
  serviceCategories,
  serviceLandingPage,
}: ServicesPropType) {
  return (
    <ServicePage
      services={services}
      serviceCategories={serviceCategories}
      serviceLandingPage={serviceLandingPage}
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const validatedServices = await getValidatedCleanServices(context);
    const validatedServiceCategories =
      await getValidatedCleanServiceCategories(context);
    const validatedServiceLandingPage =
      await getValidatedCleanServicesLandingPage(context);
    return {
      props: {
        ...(await getCommonPageProps(context)),
        serviceLandingPage: validatedServiceLandingPage,
        services: validatedServices,
        serviceCategories: validatedServiceCategories,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};
