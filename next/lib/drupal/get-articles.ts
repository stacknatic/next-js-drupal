import { deserialize, DrupalNode, JsonApiResponse } from "next-drupal";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";

import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";

import siteConfig from "@/site.config";

type GetArticlesArgs = {
  limit?: number;
  offset?: number;
  locale?: string;
};

export const getArticles = async (
  { limit = 6, offset = 0, locale = siteConfig.defaultLocale }: GetArticlesArgs,
  apiParams: DrupalJsonApiParams,
): Promise<{
  totalPages: number;
  nodes: DrupalNode[];
}> => {
  apiParams.addPageLimit(limit);

  let nodes: DrupalNode[] = [];
  let totalPages = 1;
  try {
    const result = await drupal.getResourceCollection<JsonApiResponse>(
      "node--article",
      {
        deserialize: false,
        params: {
          ...apiParams.getQueryObject(),
          "filter[langcode]": locale,
          "filter[status]": "1",
          page: {
            limit,
            offset,
          },
          sort: "-sticky,-created",
        },
        locale: locale,
        defaultLocale: siteConfig.defaultLocale,
      },
    );
    if (result.data) {
      nodes = deserialize(result) as DrupalNode[];
      totalPages = Math.ceil(result.meta.count / limit);
    }
  } catch (error) {
    console.error(error);
  }

  return {
    totalPages,
    nodes,
  };
};

export const getLatestArticlesItems = async (
  args: GetArticlesArgs,
): Promise<{
  totalPages: number;
  articles: DrupalNode[];
}> => {
  const apiParams = getNodePageJsonApiParams("node--article");
  const { totalPages, nodes } = await getArticles(args, apiParams);

  return {
    totalPages,
    articles: nodes,
  };
};

export const getRecentArticles = async (
  args: GetArticlesArgs,
): Promise<DrupalNode[]> => {
  const apiParams = getNodePageJsonApiParams("node--article");
  const { nodes } = await getArticles(args, apiParams);

  // Assuming that the nodes are already sorted by date in descending order
  const recentArticles = nodes.slice(0, 5); // Get the first 5 nodes as recent articles

  return recentArticles;
};