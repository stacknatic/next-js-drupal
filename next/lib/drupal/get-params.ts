import { DrupalJsonApiParams } from "drupal-jsonapi-params";

export function getParams(
    name: string,
    mode: string = null
): DrupalJsonApiParams {
    const params = new DrupalJsonApiParams();
    name = mode ? `${name}--${mode}` : name;
    
    if (name === "node--article"){
        return params
        .addInclude([
            "uid.field_user_avatar",
            "field_category",
            "field_tags",
        ])
        .addFields(name, [
            "title",
            "body",
            "uid",
            "created",
            "status",
            "metatag",
            "field_excerpt",
            "path",
            "sticky",
            "field_anchor_nav",
            "field_category",
            "field_tags",
        ])
        .addFields("taxonomy_term--article_category", ["name", "path"])
        .addFields("taxonomy_term--tags", ["name", "path"])
        .addFields("file--file", ["uri", "width", "height", "alt", "title"]);
    }
    if (name === "taxonomy_term--article_category"){
        return params
        .addFields("taxonomy_term--article_category", ["name", "path"]);
    }
    if (name === "taxonomy_term--tags"){
        return params
        .addFields("taxonomy_term--tags", ["name", "path"]);
    }
}
