// components/TableOfContents.tsx use existing ids
import React, { useEffect, useState } from 'react';

interface TableOfContentsProps {
  postContent: string;
}

interface TOCElement {
  id: string;
  children: JSX.Element[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ postContent }) => {
  const [headings, setHeadings] = useState<HTMLElement[]>([]);

  useEffect(() => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = postContent;

    const headingElements = Array.from(
      wrapper.querySelectorAll('h2, h3, h4, h5, h6')
    ) as HTMLElement[];

    setHeadings(headingElements);
  }, [postContent]);

  const createTableOfContents = (headings: HTMLElement[]) => {
    const toc: TOCElement[] = [];

    headings.forEach((heading) => {
      const text = heading.textContent || '';
      const id = heading.id;

      const anchor = id || text.toLowerCase().replace(/\s+/g, '-');

      toc.push({
        id: anchor,
        children: (
          <li key={anchor}>
            <a href={`#${anchor}`}>{text}</a>
          </li>
        ),
      });
    });

    return toc.map((element) => element.children);
  };

  return (
    <nav className="mt-4">
      <h2 className="text-lg font-semibold mb-2">JUMP TO:</h2>
      <ul className="list-none text-primary-500">{createTableOfContents(headings)}</ul>
    </nav>
  );
};

export default TableOfContents;

