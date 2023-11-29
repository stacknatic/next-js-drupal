import React from "react";
import { GetStaticProps } from "next";
import { getValidatedCleanServices } from "@/lib/drupal/get-services";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { getValidatedCleanServiceCategories } from "@/lib/drupal/get-service-catagories";
import ServicePage from "@/components/services/service-page";
import { ServiceDataType } from "@/lib/zod/services";
import { ServiceCategoryType } from "@/lib/zod/service-categories";

type ServicesPropType = {
  services: ServiceDataType[];
  serviceCategories: ServiceCategoryType[];
};

export default function Services({
  services,
  serviceCategories,
}: ServicesPropType) {
  return (
    <ServicePage services={services} serviceCategories={serviceCategories} />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const validatedServices = await getValidatedCleanServices(context);
    const validatedServiceCategories =
      await getValidatedCleanServiceCategories(context);
    return {
      props: {
        ...(await getCommonPageProps(context)),
        services: validatedServices,
        serviceCategories: validatedServiceCategories,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};
