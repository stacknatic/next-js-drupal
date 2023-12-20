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
    <article>
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
        <div className="flex flex-col items-center md:inline-block text-center md:text-start h-full rounded-md overflow-hidden transition-all row-span-2">
        <h3 className="text-heading-lg md:text-heading-xl text-primary-800 font-bold text-center md:text-left py-8 md:pt-16 md:pb-6">
          {project.title}
        </h3>
        {project.field_logos.length > 0 && (
          <div className=" mb-4 md:mb-8 md:mx-16 mx-8">
            <ul className="text-heading-xs mt-4">
              <CaseProfile profiles={project.field_logos} />
            </ul>
          </div>
        )}
        </div>
      
      <div className="md:px-16 px-8">
      {project.field_image && (
        <Image
          src={absoluteUrl(project.field_image.uri.url)}
          width={384}
          height={240}
          alt={project.field_image.resourceIdObjMeta.alt}
          className="w-full object-cover rounded-2xl mb-8 md:mb-16"
        />
      )}
      </div>
      {project.body && (
        <FormattedText
          className="mt-8 md:mt-16 md:mb-8 text-md/xl text-scapaflow sm:text-lg md:mx-32"
          html={project.body.processed}
        />
      )}
    </article>
  );
}

export default CaseSingle;
