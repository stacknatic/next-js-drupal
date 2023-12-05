import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { absoluteUrl } from "@/lib/drupal/absolute-url";


export function CaseTeaser({ project }: any) {
  const { t } = useTranslation();
  const router = useRouter();
  console.log("project", project.path.alias)  
  return (
    <Link
      href= {project.path.alias}
      className="grid h-full transition-all hover:shadow-md"
    >
      {project.field_image && (
        <Image
          src={absoluteUrl(project.field_image.uri.url)}
          width={384}
          height={240}
          alt={project.field_image.resourceIdObjMeta.alt}
          className="max-w-full object-cover mx-auto"
        />
      )}
      <h3 className="mb-2 line-clamp-1 text-heading-xs font-bold text-center">
        {project.title}
      </h3>
      
    </Link>
  );
}
