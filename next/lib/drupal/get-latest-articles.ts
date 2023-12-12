import { DrupalNode } from "next-drupal"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { drupal } from "./drupal-client"

export async function getStaticProps(context) {
  // highlight-start
  const params = new DrupalJsonApiParams()
    .addFields("node--blog_post", ["title", "path", "body", "uid"])
    .addFilter("status", "1")
    .addInclude(["uid.user_picture"])
    .addSort("created", "DESC")
  // highlight-end

  const articles = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--article",
    context,
    {
      params: params.getQueryObject(), // highlight-line
    }
  )
}