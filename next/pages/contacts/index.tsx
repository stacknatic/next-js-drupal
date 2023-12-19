import React from 'react';
import { useTranslation } from "next-i18next";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import ContactUsPage from '@/components/contact-us-page/contact-us-page';
import { getValidatedContactPersons } from '@/lib/drupal/get-contact-persons';

export default function Contact({ contactPersons }) {
  const { t } = useTranslation();

  return (
    <>
      <ContactUsPage contactPersons={contactPersons} />
    </>
  );
}

export const getStaticProps = async (context) => {
  const contactPersons = await getValidatedContactPersons(context);
  return {
    props: {
      ...(await getCommonPageProps(context)),
      contactPersons
    },
  };
};
