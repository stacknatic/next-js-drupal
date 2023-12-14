import React, { useEffect, useState } from 'react';
import { FaCaretDown } from "react-icons/fa";
import { GrNavigate } from "react-icons/gr";

interface TableOfContentsProps {
  postContent: string;
}

interface TOCElement {
  id: string;
  children: JSX.Element;
}

const AnchorNavigation: React.FC<TableOfContentsProps> = ({ postContent }) => {
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
      const text = heading.textContent.toUpperCase() || '';
      const id = heading.id;

      const anchor = id || text.toLowerCase().replace(/\s+/g, '-');

      toc.push({
        id: anchor,
        children: (
          <li key={anchor}>
            <a href={`#${anchor}`}>{text} <FaCaretDown className='inline'/></a>
          </li>
        ),
      });
    });

    return toc.map((element) => element.children);
  };

  return (
    <nav className="mt-4 sm:flex items-center gap-2">
      <h2 className="text-lg font-semibold">JUMP TO:</h2>
      <ul className="list-none text-primary-500 sm:flex gap-2">
        {createTableOfContents(headings).map((element, index) => (
          <React.Fragment key={index}>{element}</React.Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default AnchorNavigation;