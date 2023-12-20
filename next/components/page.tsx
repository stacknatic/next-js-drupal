import { Paragraph } from "@/components/paragraph";
import type { Page as PageType } from "@/lib/zod/page";

interface PageProps {
  page: PageType;
}

export function Page({ page }: PageProps) {
  return (
    <div className="grid gap-4">
      {page.field_content_elements?.map((paragraph) => (
        <Paragraph key={paragraph.id} paragraph={paragraph} />
      ))}
    </div>
  );
}
