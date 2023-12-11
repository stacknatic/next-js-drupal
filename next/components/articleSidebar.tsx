'use client';
import React from 'react';
import { getRecentArticles } from '@/lib/drupal/get-articles';
import { LayoutProps } from './layout';

import {
  ArticleTeaser as ArticleTeaserType,
  validateAndCleanupArticleTeaser,
} from "@/lib/zod/article-teaser";
import { ArticleListItem } from './article-list-item';

interface AllArticlesPageProps extends LayoutProps {
  articleTeasers: ArticleTeaserType[];
}

const ArticleSidebar = () =>  {
  
  return (
    <aside className="border-l-2 border-primary-500 p-2">
      sidebar
    </aside>
  );
};



export default ArticleSidebar;
