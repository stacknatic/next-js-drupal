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
      <ul className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cases?.map((case) => (
          <li key={case.id}>
            <CaseCard case={case} />
          </li>
        ))}
      </ul>
    </div>
  );
}
