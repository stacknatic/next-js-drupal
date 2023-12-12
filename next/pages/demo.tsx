import React from 'react';
import { DrupalNode } from "next-drupal";

import { NodeArticleTeaser } from '@/components/node--article--teaser';


import { drupal } from '@/lib/drupal/drupal-client';

import { getParams } from '@/lib/drupal/get-params';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';

interface NodeArticleProps {
  articles: DrupalNode;
}

export default function ArticleSidebar ({articles}: NodeArticleProps){
  
  return (
    <aside className="border-l-2 border-primary-500 p-2">
      sidebar
      {articles.map((article: DrupalNode) => (
        <div>

        <NodeArticleTeaser node={article} key={article.id} />
        <span>{article.title}</span>
        <span>{article.field_category?.name}</span>
        <span>{article.field_tags?.map((tag) => (
            <div>

          <span>{tag.href}&nbsp;</span> 
            </div>
          ))}</span>

        </div>
      )
      )}
      
    </aside>
  );
};

export async function getStaticProps(
    context: GetStaticPropsContext
): Promise<GetStaticPropsResult<NodeArticleProps>> {
    const articles = await drupal.getResourceCollectionFromContext<DrupalNode[]>(`node--article`, context,
    {
        params: getParams("node--article")
        .addSort("created", "category")
        .getQueryObject(),
    }
    )
    return {
        props: {
            articles,
        },
    };
}



