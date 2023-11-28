import React from "react";
import { GetStaticProps } from "next";
import { getValidatedCleanServices } from "@/lib/drupal/get-services";
import { getCommonPageProps } from "@/lib/get-common-page-props";

export default function Services({ services }) {
  console.log(services)
  return <div>Services</div>;
}

export const getStaticProps = async (context) => {
  try {
    const validatedServices = await getValidatedCleanServices(context);
    return {
      props: {
        ...(await getCommonPageProps(context)),
        services: validatedServices,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};
