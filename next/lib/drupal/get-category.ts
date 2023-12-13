import { DrupalNode, JsonApiResponse, deserialize } from "next-drupal";
import { getNodePageJsonApiParams } from "./get-node-page-json-api-params";
import { drupal } from "./drupal-client";
import siteConfig from "@/site.config";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";

type GetArticleCategory = {
    locale?: string;
  };

export const getArticleCategory = async ({locale = siteConfig.defaultLocale}: GetArticleCategory): Promise<DrupalNode[]> => {
    const apiParams = getNodePageJsonApiParams("taxonomy_term--article_category");
    let nodes: DrupalNode[] = [];
    try {
        const result = await drupal.getResourceCollection<JsonApiResponse>("taxonomy_term--article_category", {
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