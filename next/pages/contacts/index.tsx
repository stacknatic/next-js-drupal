import React from "react";
import { useTranslation } from "next-i18next";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import ContactUsPage from "@/components/contact-us-page/contact-us-page";
import { getValidatedContactPersons } from "@/lib/drupal/get-contact-persons";
import { Meta } from "@/components/meta";

export default function Contact({ contactPersons }) {
  const { t } = useTranslation();

  return (
    <>
      <Meta title={t("Contact")} />
      <ContactUsPage contactPersons={contactPersons} />
    </>
  );
}

export const getStaticProps = async (context) => {
  const contactPersons = await getValidatedContactPersons(context);
  return {
    props: {
      ...(await getCommonPageProps(context)),
      contactPersons,
    },
  };
};
