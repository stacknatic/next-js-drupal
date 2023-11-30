import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import BuildingIcon from "@/styles/icons/building.svg";
import { CaseCardType } from "@/lib/zod/case-card";
interface CasesCardPropsType {
  case: CaseCardType;
}

export function CaseCard({ case }: CasesCardPropsType) {
  const { t } = useTranslation();
  const router = useRouter();
  const clients = case.field_clients
    ? case.field_clients.map((client) => (
        <li key={client.id} className="flex item-center gap-2">
          <BuildingIcon className="h-6 w-6 text-primary-400" />
          <span>{client.field_client_name}</span>
        </li>
      ))
    : false;
  return (
    <Link
      href={case.path.alias}
      className="grid h-full rounded-md border border-finnishwinter bg-white overflow-hidden transition-all hover:shadow-md relative"
    >
      {case.field_image && (
        <Image
          src={absoluteUrl(case.field_image.uri.url)}
          width={384}
          height={240}
          alt={case.field_image.resourceIdObjMeta.alt}
          className="w-full object-cover"
        />
      )}
      <h3 className=" justify-self-center self-center line-clamp-2 text-xl font-bold py-6 border-b">
        {case.title}
      </h3>
      <div className="grid gird-col-1 p-4">
        {/* some case might not have clients */}
        {clients && <ul className="mb-4">{clients}</ul>}
        {/* only render if filed avilable */}
        {case.field_excerpt && <p>{case.field_excerpt}</p>}
        <button className="content-end border h-14 py-3 bg-primary-100 rounded-full mt-4 hover:bg-primary-400  text-center">
          Learn more
        </button>
      </div>
    </Link>
  );
}
