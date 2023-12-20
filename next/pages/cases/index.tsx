import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { ContactList } from "@/components/contact-list";
import { LogoStrip } from "@/components/logo-strip";
// import { Meta } from "@/components/meta";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { CasesCards } from "@/components/cases/cases-cards";
import { CaseCardType } from "@/lib/zod/case-card";
import { validatedCasesTeaser } from "@/lib/drupal/get-case-teasers";
import { Meta } from "@/components/meta";

interface CaseCardsPropsType {
  cases: CaseCardType[];
}

export default function Cases({ cases }: CaseCardsPropsType) {
  const { t } = useTranslation();
  return (
    <>
      <Meta title={t("Cases")} />
      <CasesCards cases={cases} heading={t("Cases")} />
    </>
  );
}

export const getStaticProps: GetStaticProps<CaseCardsPropsType> = async (
  context,
) => {
  try {
    // data fetching is abstracted, so that only "validatedCasesTeaser" function call will return cases teasers data. In this way we can call the fucntion in other routes when we needed it.
    const validatedCaseTeasers = await validatedCasesTeaser(context);
    return {
      props: {
        ...(await getCommonPageProps(context)),
        cases: validatedCaseTeasers,
      },
      revalidate: 60,
    };
  } catch (err) {
    return { notFound: true };
  }
};
