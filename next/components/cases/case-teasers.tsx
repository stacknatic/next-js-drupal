import Link from "next/link";
import { useTranslation } from "next-i18next";
import clsx from "clsx";

import { CaseTeaser } from "@/components/cases/case-teaser";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { buttonVariants } from "@/ui/button";


export function CaseTeasers({ cases, heading }: any) {
  const { t } = useTranslation();
  console.log("cases", cases);
  return (
    <>
      <h2 className="text-heading-sm font-bold md:text-heading-md my-10">
        {heading}
      </h2>
      <ul className="mt-4 grid grid-cols-1 lg:gap-10 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:h-500">
        {cases?.slice(0, 3).map((project) => (
          <li key={project}>
            <CaseTeaser project={project} />
            </li>
        ))}
        </ul>
        <div className="flex items-center lg:justify-start  lg:mb-24">
        {!cases?.length && <p className="py-4">{t("no-content-found")}</p>}
        {cases?.length && (
          <Link
            href="/cases"
            className={clsx(
              buttonVariants({ variant: "primary" }),
              "text-base lg:my-10 mt-2 mb-4 inline-flex px-5 py-3 rounded-full border-white",
            )}
          >
            {t("All-cases")}
            <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
          </Link>
        )}
      </div>
    </>
  );
}
