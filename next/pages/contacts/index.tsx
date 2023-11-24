import React from 'react';
import { useTranslation } from "next-i18next";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import ContactUsPage from '@/components/contact-us-page/contact-us-page';

export default function Contact() {
  const { t } = useTranslation();



  return (
    <>
        <h1 className="text-2xl font-bold text-center my-10">{t("Say Hello! Don't be shy.")}</h1>
        <ContactUsPage />
        
    </>
  );
}

export const getStaticProps = async (context) => {
  return {
    props: {
      ...(await getCommonPageProps(context)),
    },
  };
};
