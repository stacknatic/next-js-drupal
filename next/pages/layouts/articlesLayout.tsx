// DynamicPageLayout.tsx
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import ArticleSidebar from '@/components/articleSidebar';


interface DynamicPageLayoutProps {
  children: ReactNode;
}

const ArticleLayout: React.FC<DynamicPageLayoutProps> = ({ children }) => {
    const pathname = usePathname();
  return (
    <>
    <div className='ml-1 p-1 main-content-container'>
     
      <>{children}</>

    </div>
    </>
  );
};

export default ArticleLayout;
