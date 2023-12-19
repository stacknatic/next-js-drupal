import clsx from "clsx";

import { FormattedText } from "@/components/formatted-text";
import { HeadingParagraph } from "@/components/heading--paragraph";
import { FormattedText as FormattedTextType } from "@/lib/zod/paragraph";
import Link from "next/link";
import { buttonVariants } from "@/ui/button";
import ArrowIcon from "@/styles/icons/arrow-down.svg";
import { useTranslation } from "react-i18next";

export function ParagraphText({ paragraph }: { paragraph: FormattedTextType }) {
  const { t } = useTranslation();
  return (
    <div className="bg-bittersweet sm:min-w-screen lg:mx-[-168px] mx-[-24px] py-6 lg:h-[800px] lg:pt-28 flex flex-col content-center overflow-x-hidden">
      {paragraph.field_heading && (
        <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
      )}
      <FormattedText
        html={paragraph.field_formatted_text.processed}
        className={clsx(
        "lg:text-left lg:px-44 text-md/2xl text-primary-600 sm:text-lg font-bold lg:text-heading-lg text-center mx-4 lg:mx-0 mb-6",
        paragraph.field_heading && "mt-4",
        )}
      />
      <Link
            href="/cases"
            className={clsx(
              buttonVariants({ variant: "quaternary" }),
              "text-base font-bold lg:ml-44 lg:mt-6 inline-flex mx-auto mb-10 mt-6 p-2 lg:px-5 lg:py-3 rounded-full border",
            )}
          >
            {t("Hear what our clients say")}
            {/* <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" /> */}
          </Link>
    </div>
  );
}
