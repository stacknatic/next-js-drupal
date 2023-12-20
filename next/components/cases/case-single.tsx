import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { FormattedText } from "../formatted-text";
import CaseProfile from "./case-profile";
import { Breadcrumbs } from "../breadcrumbs";
import { CaseSingleType } from "@/lib/zod/case-single";
import AnchorNavigation from "../anchorNavigation";

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
        <div className="flex flex-col items-center md:inline-block text-center md:text-start my-4 h-full rounded-md  overflow-hidden transition-all row-span-2">
        <h3 className="mt-4 md:mt-8 pb-8 line-clamp-1 text-heading-xs md:text-heading-md lg:text-heading-lg font-bold">
          {project.title}
        </h3>
        {project.field_logos.length > 0 && (
          <div className=" mb-4 md:mb-8">
            {/* <AnchorNavigation postContent={project.body?.processed}/> */}
            <ul className="text-heading-xs mt-4">
              <CaseProfile profiles={project.field_logos} />
            </ul>
          </div>
        )}
        </div>
        {/* <button className="border py-2 px-7 mb-4 bg-primary-100 rounded hover:bg-primary-400  justify-self-start">
          Contact us
        </button> */}
      
      {project.field_image && (
        <Image
          src={absoluteUrl(project.field_image.uri.url)}
          width={384}
          height={240}
          alt={project.field_image.resourceIdObjMeta.alt}
          className="w-full object-cover rounded-2xl mb-8 md:mb-16"
        />
      )}
      {project.body && (
        <FormattedText
          className="my-4 text-md/xl sm:text-lg md:w-[800px] md:mx-auto"
          html={project.body.processed}
        />
      )}
    </article>
  );
}

export default CaseSingle;
