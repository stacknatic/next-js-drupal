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
    <nav className="breadcrumb-container" {...props}>
        {items.map((item, index) => (
          <span key={index}>
            {item.url ? (
              <Link href={item.url} passHref legacyBehavior={true}>
                  <span className="underline text-link">{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</span>
                </Link>
              //   <Link href={item.url} passHref legacyBehavior={true} className="mr-1">
              //   {item.title}
              // </Link>
            ) : (
                `${item.title.charAt(0).toUpperCase()}${item.title.slice(1)}`
            )}
            {index !== items.length - 1 && (
             <span className = "mx-2">/</span>
            )}
          </span>
        ))}
    </nav>
  );
}
