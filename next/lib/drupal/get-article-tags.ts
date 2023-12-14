import { DrupalNode, JsonApiResponse, deserialize } from "next-drupal";
import { getNodePageJsonApiParams } from "./get-node-page-json-api-params";
import { drupal } from "./drupal-client";
import siteConfig from "@/site.config";

type GetArticlesTags = {
    locale?: string;
  };

export const getArticleTags = async ({locale = siteConfig.defaultLocale}: GetArticlesTags): Promise<DrupalNode[]> => {
    const apiParams = getNodePageJsonApiParams("taxonomy_term--tags");
    let nodes: DrupalNode[] = [];
    try {
        const result = await drupal.getResourceCollection<JsonApiResponse>("taxonomy_term--tags", {
        deserialize: false,
        params: {
            ...apiParams.getQueryObject(),
            "filter[langcode]": locale,
            "filter[status]": "1",
            sort: "name",
        },
        locale: locale,
        defaultLocale: "en",
        });
        if (result.data) {
            nodes = deserialize(result) as DrupalNode[];
        }
    } catch (error) {
        console.error(error);
    }
        
    return nodes;
    }