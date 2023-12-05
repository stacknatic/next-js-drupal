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
      className="grid h-full rounded-md border border-finnishwinter bg-white overflow-hidden transition-all hover:shadow-md relative"
    >
      {project.field_image && (
        <Image
          src={absoluteUrl(project.field_image.uri.url)}
          width={384}
          height={240}
          alt={project.field_image.resourceIdObjMeta.alt}
          className="w-full object-cover"
        />
      )}
      <h3 className=" justify-self-center self-center line-clamp-2 text-xl font-bold py-6 border-b">
        {project.title}
      </h3>
      <div className="grid gird-col-1 p-4">
        {/* some project might not have clients */}
        {/* {clients && <ul className="mb-4">{clients}</ul>} */}
        {/* only render if filed avilable */}
        {project.field_excerpt && <p>{project.field_excerpt}</p>}
        <button className="content-end border h-14 py-3 bg-primary-100 rounded-full mt-4 hover:bg-primary-400  text-center">
          Learn more
        </button>
      </div>
    </Link>
  );
}
