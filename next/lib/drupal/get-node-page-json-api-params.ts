import { DrupalJsonApiParams } from "drupal-jsonapi-params";

import { env } from "@/env";

export type ResourceType =
  | "node--frontpage"
  | "node--page"
  | "node--news"
  | "node--article"
  | "node--events"
  | "node--service"
  | "node--cases"
  | "taxonomy_term--article_category"
  | "taxonomy_term--tags";


export function getNodePageJsonApiParams(resourceType: ResourceType) {
  const apiParams = new DrupalJsonApiParams().addFilter(
    "field_site.meta.drupal_internal__target_id",
    env.DRUPAL_SITE_ID,
  );
  // The page content type has paragraphs, stored in the "field_content_elements" field:
  if (resourceType === "node--page") {
    apiParams
      .addInclude([
        "field_content_elements",
        "field_content_elements.field_image.field_media_image",
        "field_content_elements.field_video",
        "field_content_elements.field_file_attachments.field_media_document",
        "field_content_elements.field_accordion_items",
        "field_content_elements.field_accordion_items.field_content_elements.field_image.field_media_image",
        "field_content_elements.field_accordion_items.field_content_elements.field_video",
      ])
      .addFields("node--page", [
        "title",
        "field_content_elements",
        "path",
        "status",
        "metatag",
      ]);
  }

  // The frontpage content type has paragraphs, stored in the "field_content_elements" field:
  if (resourceType === "node--frontpage") {
    apiParams
      .addInclude([
        "field_content_elements",
        "field_content_elements.field_image.field_media_image",
        "field_content_elements.field_video",
        "field_content_elements.field_file_attachments.field_media_document",
        "field_content_elements.field_accordion_items",
        "field_content_elements.field_accordion_items.field_content_elements.field_image.field_media_image",
        "field_content_elements.field_accordion_items.field_content_elements.field_video",
      ])
      // Only published frontpages:
      .addFilter("status", "1")
      .addFields("node--frontpage", [
        "title",
        "field_content_elements",
        "metatag",
      ]);
  }

  // The article content type has an image field, and author information:
  if (resourceType === "node--article") {
    apiParams.addInclude(["field_image", "uid.field_user_avatar", "field_category", "field_tags"])
    apiParams.addFields(resourceType, [
      "title",
      "body",
      "uid",
      "created",
      "field_image",
      "status",
      "metatag",
      "field_excerpt",
      "path",
      "sticky",
      "field_anchor_nav",
      "field_category",
      "field_tags",
    
    ])
    apiParams.addFields("taxonomy_term--article_category", ["name", "path"])
    apiParams.addFields("taxonomy_term--tags", ["name", "path"])
    apiParams.addFields("user--user", ["display_name", "field_user_avatar"])

  }

  if (resourceType === "node--news") {
    apiParams.addInclude(["field_image", "uid.field_user_avatar"])
    apiParams.addFields(resourceType, [
      "title",
      "body",
      "uid",
      "created",
      "field_image",
      "status",
      "metatag",
      "field_excerpt",
      "path",
      "sticky",
      "field_anchor_nav",
    ]);
    
  }

  if (resourceType === "node--events") {
    apiParams.addInclude([
      "field_image",
      "field_organizers",
      "field_speakers",
      "uid",
    ]);
    apiParams.addFields(resourceType, [
      "title",
      "body",
      "uid",
      "field_image",
      "status",
      "metatag",
      "path",
      "field_start_date",
      "field_end_date",
      "field_organizers",
      "field_speakers",
    ]);
  }
  if (resourceType === "node--service") {
    apiParams.addInclude(["field_service_category", "field_service_image"]);
    apiParams.addFilter("status", "1");
    apiParams.addFields(resourceType, [
      "id,title",
      "path",
      "field_service_description",
      "field_service_short_description",
      "field_service_list",
      "field_service_name",
      "field_service_statement",
      "field_service_category",
      "field_service_image",
    ]);
    apiParams.addFields("node--service_category", ["field_category_name"]);
    apiParams.addFields("file--file", ["uri"]);
  }

  if (resourceType === "node--cases") {
    apiParams.addInclude(["field_image", "field_logos.field_logo", "uid"]);
    apiParams.addFields(resourceType, [
      "title",
      "body",
      "field_image",
      "status",
      "metatag",
      "path",
      "field_logos",
      "field_logo",
    ]);
  }
  if (resourceType === "taxonomy_term--article_category") {
    apiParams.addFields(resourceType, ["name", "path"]);
  }
  if (resourceType === "taxonomy_term--tags") {
    apiParams.addFields(resourceType, ["name", "path"]);
  }

  return apiParams;
}
