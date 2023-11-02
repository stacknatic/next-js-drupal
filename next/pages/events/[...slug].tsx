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
import EventSingle from "@/components/events/event-single";

export default function Event({ resource }) {
  if (!resource) return null;

  return (
    <>
      <Meta title={resource.title} metatags={resource.metatag} />
      <EventSingle event={resource} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const paths = await drupal.getStaticPathsFromContext("node--events", context);
  return {
    paths: paths,
    fallback: "blocking",
  };
};

interface PageProps extends CommonPageProps {
  // resource: PageType | ArticleType;
  languageLinks: LanguageLinks;
}

export const getStaticProps = async (context) => {
  const path = await drupal.translatePathFromContext(context, {
    pathPrefix: "/events",
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
      params: getNodePageJsonApiParams("node--events").getQueryObject(),
    },
  );

  // At this point, we know the path exists and it points to a resource.
  // If we receive an error, it means something went wrong on Drupal.
  // We throw an error to tell revalidation to skip this for now.
  // Revalidation can try again on next request.
  if (!resource) {
    throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`);
  }

  // If we're not in preview mode and the resource is not published,
  // Return page not found.
  if (!context.preview && resource?.status === false) {
    return {
      notFound: true,
    };
  }

  // Add information about possible other language versions of this node.
  const nodeTranslations = await getNodeTranslatedVersions(
    resource,
    context,
    drupal,
  );
  const languageLinks = createLanguageLinks(nodeTranslations);

  // const validatedResource =
  //   type === "node--article"
  //     ? validateAndCleanupArticle(resource)
  //     : type === "node--page"
  //     ? validateAndCleanupPage(resource)
  //     : null;

  return {
    props: {
      ...(await getCommonPageProps(context)),
      resource: resource,
      languageLinks,
    },
    revalidate: 60,
  };
};
