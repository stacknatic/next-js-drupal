import { useTranslation } from "next-i18next";
import Link from "next/link";

export interface BreadcrumbsProps {
  items: {
    title: string;
    url?: string;
  }[];
}

export function Breadcrumbs({ items, ...props }: BreadcrumbsProps) {
  const { t } = useTranslation();
  if (!items?.length) {
    return null;
  }

  // Check if "home" is already in the items list
  const hasHome = items.some(item => item.title === t("home"));

  // If "home" is not in the list, add it at the beginning
  if (!hasHome) {
    items.unshift({
      title: t("home"),
      url: "/",
    });
  }

  return (
    <nav className="py-4 text-text hidden md:flex" {...props}>
      <ol className="flex">
        {items.map((item, index) => (
          <li key={index} className="flex items-center leading-none truncate">
            {item.url ? (
              <Link href={item.url} passHref legacyBehavior={true}>
                  <a className="underline text-link">{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</a>
                </Link>
            ) : (
                `${item.title.charAt(0).toUpperCase()}${item.title.slice(1)}`
            )}
            {index !== items.length - 1 && (
              <svg
                className="w-3 h-3 mx-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
