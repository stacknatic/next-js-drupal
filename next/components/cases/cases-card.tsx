import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import BuildingIcon from "@/styles/icons/building.svg";
import { CaseCardType } from "@/lib/zod/case-card";
interface CasesCardPropsType {
  project: CaseCardType;
}

export function CaseCard({ project }: CasesCardPropsType) {
  const { t } = useTranslation();
  const router = useRouter();
  const logos = project.field_logos
    ? project.field_logos.map((logo) => (
        <li key={logo.id} className="flex item-center gap-2">
          <BuildingIcon className="h-6 w-6 text-primary-400" />
          <span>{logo.id}</span>
        </li>
      ))
    : false;
  return (
    <Link
      href={project.path.alias}
      className="relative grid transition-all hover:shadow-md rounded-3xl mb-12"
    >
      {project.field_image && (
        <Image
          src={absoluteUrl(project.field_image.uri.url)}
          width={384}
          height={240}
          alt={project.field_image.resourceIdObjMeta.alt}
          className="max-w-full object-cover mx-auto min-h-[40vh] rounded-2xl brightness-50 hover:brightness-100"
        />
      )}
      <div className="info absolute bottom-0 my-4 line-clamp-2 text-sm text-center text-white w-webkit-fill-available">
      <h3 className=" mb-4 line-clamp-1 text-heading-xs font-bold text-center mx-4">
        {project.title}
      </h3>
      </div>
    </Link>
  );
}
