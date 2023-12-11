// DynamicPageLayout.tsx
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';


interface DynamicPageLayoutProps {
  children: ReactNode;
}

const ArticleLayout: React.FC<DynamicPageLayoutProps> = ({ children }) => {
    const pathname = usePathname();
  return (
    <>
    <div className='border-2 border-primary-500 rounded-lg ml-1 p-1'>
     
      <>{children}</>

      
    </div>
      {pathname.includes('/articles/') && (
          <aside className="border-2 border-primary-500 rounded-lg">
            sample
          </aside>
          )}
          </>
  );
};

export default ArticleLayout;
