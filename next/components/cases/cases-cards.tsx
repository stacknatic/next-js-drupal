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
      <h2 className="pb-6 md:pb-8 text-center text-heading-sm font-bold md:text-heading-md">
        {heading}
      </h2>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
        {cases?.map((project) => (
          <li key={project.id}>
            <CaseCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}
