import clsx from "clsx";

import { FormattedText } from "@/components/formatted-text";
import { HeadingParagraph } from "@/components/heading--paragraph";
import { FormattedText as FormattedTextType } from "@/lib/zod/paragraph";

export function ParagraphText({ paragraph }: { paragraph: FormattedTextType }) {
  return (
    <>
      {paragraph.field_heading && (
        <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
      )}
      <FormattedText
        html={paragraph.field_formatted_text.processed}
        className={clsx(
          "mx-10 text-left text-md/xl text-scapaflow sm:text-lg",
          paragraph.field_heading && "mt-4",
        )}
      />
    </>
  );
}
