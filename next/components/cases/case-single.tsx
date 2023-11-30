import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { HeadingPage } from "../heading--page";
import Image from "next/image";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { FormattedText } from "../formatted-text";
import CaseProfile from "./case-profile";
import CalenderIcon from "@/styles/icons/calendar.svg";
import { Breadcrumbs } from "../breadcrumbs";
import { CaseSingleType } from "@/lib/zod/case-single";

function CaseSingle({ case }: { case: CaseSingleType }) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <article className="grid md:grid-cols-2 md:gap-1 gap-2 px-4">
      <div className="grid grid-cols-1 content-start h-full rounded-md  overflow-hidden transition-all row-span-2">
        <Breadcrumbs
          items={[
            {
              title: t("cases"),
              url: "/cases",
            },
            {
              title: case.title,
            },
          ]}
        />
        {case.field_clients.length > 0 && (
          <div className=" mb-4 md:mb-8">
            {/* some case might not have clients */}
            <h3 className="text-heading-sm mt-8 ">Clients</h3>
            <ul className="text-heading-xs mt-4">
              <CaseProfile profiles={case.field_clients} />
            </ul>
          </div>
        )}

        {case.field_projects.length > 0 && (
          <div className=" mb-4 md:mb-8">
            {/* some case might not have clients */}
            <h3 className="text-heading-sm mt-8 ">Projects</h3>
            <ul className="text-heading-xs mt-4">
              <CaseProfile profiles={case.field_projects} />
            </ul>
          </div>
        )}

        <button className="border py-2 px-7 mb-4 bg-primary-100 rounded hover:bg-primary-400  justify-self-start">
          Contact us
        </button>
      </div>
      {case.field_image && (
        <Image
          src={absoluteUrl(case.field_image.uri.url)}
          width={384}
          height={240}
          alt={case.field_image.resourceIdObjMeta.alt}
          className="w-full object-cover rounded-md"
        />
      )}
      {case.body && (
        <FormattedText
          className="mt-4 text-md/xl text-scapaflow sm:text-lg "
          html={case.body.processed}
        />
      )}
    </article>
  );
}

export default CaseSingle;
