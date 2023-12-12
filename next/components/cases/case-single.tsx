import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { FormattedText } from "../formatted-text";
import CaseProfile from "./case-profile";
import { Breadcrumbs } from "../breadcrumbs";
import { CaseSingleType } from "@/lib/zod/case-single";

function CaseSingle({ project }: { project: CaseSingleType }) {
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
              title: project.title,
            },
          ]}
        />
        {project.field_logos.length > 0 && (
          <div className=" mb-4 md:mb-8">
            <h3 className="text-heading-sm mt-8 ">Client</h3>
            <ul className="text-heading-xs mt-4">
              <CaseProfile profiles={project.field_logos} />
            </ul>
          </div>
        )}
        <button className="border py-2 px-7 mb-4 bg-primary-100 rounded hover:bg-primary-400  justify-self-start">
          Contact us
        </button>
      </div>
      {project.field_image && (
        <Image
          src={absoluteUrl(project.field_image.uri.url)}
          width={384}
          height={240}
          alt={project.field_image.resourceIdObjMeta.alt}
          className="w-full object-cover rounded-md"
        />
      )}
      {project.body && (
        <FormattedText
          className="mt-4 text-md/xl sm:text-lg "
          html={project.body.processed}
        />
      )}
    </article>
  );
}

export default CaseSingle;
