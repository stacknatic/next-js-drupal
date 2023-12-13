import React from 'react';
import { DrupalNode } from "next-drupal";

import { NodeArticleTeaser } from './node--article--teaser';


import { drupal } from '@/lib/drupal/drupal-client';

import { getParams } from '@/lib/drupal/get-params';

interface NodeArticleProps {
  articles: DrupalNode;
}

export default function ArticleSidebar ({articles}: NodeArticleProps){
  
  return (
    <aside className="border-l-2 border-primary-500 p-2">
      sidebar
      {articles?.map((article: DrupalNode) => (
        <NodeArticleTeaser node={article} key={article.id} />
      )
      )}
      
    </aside>
  );
};



