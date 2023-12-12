import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { absoluteUrl } from "@/lib/drupal/absolute-url";


export function CaseTeaser({ project }: any) {
  const { t } = useTranslation();
  const router = useRouter(); 
  return (
    <Link
      href= {project.path.alias}
      className="relative grid transition-all hover:shadow-md rounded-3xl "
    >
    <div className="movingCard ">
      {project.field_image && (
        <Image
          src={absoluteUrl(project.field_image.uri.url)}
          width={384}
          height={240}
          alt={project.field_image.resourceIdObjMeta.alt}
          className="max-w-full object-cover mx-auto min-h-[30vh] lg:min-h-[50vh] rounded-3xl lg:brightness-50 hover:brightness-100 "
        />
      )}
            <div className="info lg:absolute lg:bottom-0  my-4 line-clamp-2 text-sm text-scapaflow text-center lg:text-white ">
      <h3 className="mb-4 line-clamp-1 text-heading-xs font-bold text-center mx-4">
        {project.title}
      </h3>
      </div>
      </div>
    </Link>
  );
}
