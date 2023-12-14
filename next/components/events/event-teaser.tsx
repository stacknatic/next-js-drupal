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
  const date = event.field_start_date
    ? formatDate(event.field_start_date, router.locale)
    : "Soon";
  return (
    <Link
      href={event.path.alias}
      className="relative grid transition-all hover:shadow-md rounded-3xl mb-12 "
    >
      <div className="movingCard ">
        {event.field_image && (
          <Image
            src={absoluteUrl(event.field_image.uri.url)}
            width={384}
            height={240}
            alt={event.field_image.resourceIdObjMeta.alt}
            className="max-w-full object-cover mx-auto min-h-[40vh] lg:min-h-[50vh] rounded-3xl brightness-50 hover:brightness-100 "
          />
        )}
        <div className="info absolute bottom-0 my-4 line-clamp-2 text-sm text-center text-white w-webkit-fill-available">
          {/* {author && <>{t("posted-by", { author })} - </>} */}
          {date && <p>{date}</p>}
          <h3 className="mb-4 line-clamp-1 text-heading-xs font-bold text-center mx-4">
            {event.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
