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
        <span key={index} itemScope itemType="http://schema.org/ListItem">
          <span itemProp="name">
            {item.url ? (
              <Link href={item.url} passHref legacyBehavior={true}>
                <a className="underline text-link">
                  {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                </a>
              </Link>
            ) : (
              `${item.title.charAt(0).toUpperCase()}${item.title.slice(1)}`
            )}
          </span>
          <meta itemProp="position" content={(index + 1).toString()} />
          {index !== items.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
}
