import { useTranslation } from "next-i18next";
import { CaseCard } from "@/components/cases/cases-card";
import { Breadcrumbs } from "../breadcrumbs";
import { CaseCardType } from "@/lib/zod/case-card";

interface CasesCardsPropsType {
  cases: CaseCardType[];
  heading: string;
}

export function CasesCards({ cases, heading }: CasesCardsPropsType) {
  const { t } = useTranslation();
  return (
    <div className="grid justify-center">
      <Breadcrumbs
        items={[
          {
            title: t("cases"),
          },
        ]}
      />
      <h2 className="text-heading-lg md:text-heading-xl text-primary-800 font-bold text-center md:text-left py-8 md:py-16">
        {heading}
      </h2>
      <ul className="md:px-16 px-8 grid grid-cols-1 ld:gap-10 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cases?.map((project) => (
          <li key={project.id}>
            <CaseCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}
