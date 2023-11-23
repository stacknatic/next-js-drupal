import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";


export function EventTeaser({ event }: any) {
  const { t } = useTranslation();
  // const author = event.uid?.display_name;
  const router = useRouter();
  const date = formatDate(event.created, router.locale);
  return (
    <Link
      href={event.path.alias}
      className="grid h-full p-4 transition-all hover:shadow-md"
    >
      {event.field_image && (
        <Image
          src={absoluteUrl(event.field_image.uri.url)}
          width={384}
          height={240}
          alt={event.field_image.resourceIdObjMeta.alt}
          className="max-w-full object-cover mx-auto"
        />
      )}
      <div className="my-4 line-clamp-2 text-sm text-scapaflow text-center">
        {/* {author && <>{t("posted-by", { author })} - </>} */}
        {date}
      </div>
      <h3 className="mb-2 line-clamp-1 text-heading-xs font-bold text-center">
        {event.title}
      </h3>
      
    </Link>
  );
}
