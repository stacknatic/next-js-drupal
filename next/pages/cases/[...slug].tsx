import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode, DrupalTranslatedPath } from "next-drupal";

import { Meta } from "@/components/meta";
import {
  createLanguageLinks,
  LanguageLinks,
} from "@/lib/contexts/language-links-context";
import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { ResourceType } from "@/lib/drupal/get-node-page-json-api-params";
import { getNodeTranslatedVersions } from "@/lib/drupal/get-node-translated-versions";
import {
  CommonPageProps,
  getCommonPageProps,
} from "@/lib/get-common-page-props";
import CaseSingle from "@/components/cases/case-single";
import { CaseSingleSchema, CaseSingleType } from "@/lib/zod/case-single";

interface PageProps extends CommonPageProps {
  resource: CaseSingleType;
  languageLinks: LanguageLinks;
}
export default function Case({ resource }: PageProps) {
  if (!resource) return null;
  return (
    <>
      <Meta title={resource.title} metatags={resource.metatag} />
      <CaseSingle project={resource} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const paths = await drupal.getStaticPathsFromContext("node--cases", context);
  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  try {
    const path = await drupal.translatePathFromContext(context, {
      pathPrefix: "/cases",
    });
    if (!path) {
      return {
        notFound: true,
      };
    }

    const type = path.jsonapi.resourceName as ResourceType;

    const resource = await drupal.getResourceFromContext<DrupalNode>(
      path,
      context,
      {
        params: getNodePageJsonApiParams("node--cases").getQueryObject(),
      },
    );

    // At this point, we know the path exists and it points to a resource.
    // If we receive an error, it means something went wrong on Drupal.
    // We throw an error to tell revalidation to skip this for now.
    // Revalidation can try again on next request.
    if (!resource) {
      throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`);
    }

    // Add information about possible other language versions of this node.
    const nodeTranslations = await getNodeTranslatedVersions(
      resource,
      context,
      drupal,
    );
    const languageLinks = createLanguageLinks(nodeTranslations);
    // validation of of the resources
    const validResource = CaseSingleSchema.parse(resource);

    return {
      props: {
        ...(await getCommonPageProps(context)),
        resource: validResource,
        languageLinks,
      },
      revalidate: 60,
    };
  } catch (error) {
    // if data fetching is failed page not found will be returnd, no error in browser
    return {
      notFound: true,
    };
  }
};
