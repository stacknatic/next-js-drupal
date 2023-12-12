import { DrupalNode } from "next-drupal";
import { z } from "zod"

export const PostSchema = z.object({
  data: z.object({
    // type: z.string(),
    type: z.literal("node--article"),
    id: z.string(),
    links: z.object({ self: z.object({ href: z.string() }) }),
    attributes: z.object({
      drupal_internal__nid: z.number(),
      drupal_internal__vid: z.number(),
      langcode: z.string(),
      revision_timestamp: z.string(),
      revision_log: z.null(),
      status: z.boolean(),
      title: z.string(),
      created: z.string(),
      changed: z.string(),
      promote: z.boolean(),
      sticky: z.boolean(),
      default_langcode: z.boolean(),
      revision_translation_affected: z.boolean(),
      metatag: z.array(
        z.union([
          z.object({
            tag: z.string(),
            attributes: z.object({ name: z.string(), content: z.string() })
          }),
          z.object({
            tag: z.string(),
            attributes: z.object({ rel: z.string(), href: z.string() })
          })
        ])
      ),
      path: z.object({
        alias: z.string(),
        pid: z.number(),
        langcode: z.string()
      }),
      content_translation_source: z.string(),
      content_translation_outdated: z.boolean(),
      body: z.object({
        value: z.string(),
        format: z.string(),
        processed: z.string(),
        summary: z.string()
      }),
      field_anchor_nav: z.null(),
      field_excerpt: z.string()
    }),
    relationships: z.object({
      node_type: z.object({
        data: z.object({
          type: z.string(),
          id: z.string(),
          meta: z.object({ drupal_internal__target_id: z.string() })
        }),
        links: z.object({
          related: z.object({ href: z.string() }),
          self: z.object({ href: z.string() })
        })
      }),
      revision_uid: z.object({
        data: z.object({
          type: z.string(),
          id: z.string(),
          meta: z.object({ drupal_internal__target_id: z.number() })
        }),
        links: z.object({
          related: z.object({ href: z.string() }),
          self: z.object({ href: z.string() })
        })
      }),
      uid: z.object({
        data: z.object({
          type: z.string(),
          id: z.string(),
          meta: z.object({ drupal_internal__target_id: z.number() })
        }),
        links: z.object({
          related: z.object({ href: z.string() }),
          self: z.object({ href: z.string() })
        })
      }),
      field_category: z.object({
        data: z.object({
          type: z.string(),
          id: z.string(),
          meta: z.object({ drupal_internal__target_id: z.number() })
        }),
        links: z.object({
          related: z.object({ href: z.string() }),
          self: z.object({ href: z.string() })
        })
      }),
      field_image: z.object({
        data: z.object({
          type: z.string(),
          id: z.string(),
          meta: z.object({
            alt: z.string(),
            title: z.string(),
            width: z.number(),
            height: z.number(),
            drupal_internal__target_id: z.number()
          })
        }),
        links: z.object({
          related: z.object({ href: z.string() }),
          self: z.object({ href: z.string() })
        })
      }),
      field_tags: z.object({
        data: z.array(
          z.object({
            type: z.string(),
            id: z.string(),
            meta: z.object({ drupal_internal__target_id: z.number() })
          })
        ),
        links: z.object({
          related: z.object({ href: z.string() }),
          self: z.object({ href: z.string() })
        })
      })
    })
  }),
  links: z.object({ self: z.object({ href: z.string() }) })
})


export function validateAndCleanupArticle(article: DrupalNode): Post | null {
  try {
    return PostSchema.parse(article);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    // console.log(JSON.stringify({ name, issues, article }, null, 2));
    return null;
  }
}

export type Post = z.infer<typeof PostSchema>;
