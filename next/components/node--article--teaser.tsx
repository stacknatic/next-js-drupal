import { DrupalNode } from "next-drupal";
import Link from "next/link";

interface NodeArticleTeaserProps {
    node: DrupalNode;
}

export function NodeArticleTeaser({ node }: NodeArticleTeaserProps) {
    return (
        <article className="mb-4">
            <Link href={node.path.alias}>
                    <h3 className="text-heading-sm font-bold">{node.title}</h3>
            </Link>
        </article>
    );
}