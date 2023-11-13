import { deserialize, DrupalNode, JsonApiResponse } from "next-drupal";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";

import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";

import siteConfig from "@/site.config";

type GetNewsArgs = {
  limit?: number;
  offset?: number;
  locale?: string;
};

export const getNews = async (
  { limit = 6, offset = 0, locale = siteConfig.defaultLocale }: GetNewsArgs,
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
      "node--news",
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

export const getLatestNewsItems = async (
  args: GetNewsArgs,
): Promise<{
  totalPages: number;
  news: DrupalNode[];
}> => {
  const apiParams = getNodePageJsonApiParams("node--news");
  const { totalPages, nodes } = await getNews(args, apiParams);

  return {
    totalPages,
    news: nodes,
  };
};
