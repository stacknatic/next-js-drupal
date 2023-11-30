import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { absoluteUrl } from "@/lib/drupal/absolute-url";


export function CaseTeaser({ case }: any) {
  const { t } = useTranslation();
  // const author = case.uid?.display_name;
  const router = useRouter();
  return (
    <Link
      href={case.path.alias}
      className="grid h-full transition-all hover:shadow-md"
    >
      {case.field_image && (
        <Image
          src={absoluteUrl(case.field_image.uri.url)}
          width={384}
          height={240}
          alt={case.field_image.resourceIdObjMeta.alt}
          className="max-w-full object-cover mx-auto"
        />
      )}
      <div className="my-4 line-clamp-2 text-sm text-scapaflow text-center">
        {/* {author && <>{t("posted-by", { author })} - </>} */}
        {date}
      </div>
      <h3 className="mb-2 line-clamp-1 text-heading-xs font-bold text-center">
        {case.title}
      </h3>
      
    </Link>
  );
}
