import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import clsx from "clsx";

import { useLanguageLinks } from "@/lib/contexts/language-links-context";
import { useOnClickOutside } from "@/lib/hooks/use-on-click-outside";
import LanguageIcon from "@/styles/icons/language.svg";

export function LanguageSwitcher() {
  const languageLinks = useLanguageLinks();
  const { locale, locales } = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  // Close on locale change
  useEffect(close, [locale]);

  // Close on click outside
  const ref = useOnClickOutside<HTMLDivElement>(close);
  const { t } = useTranslation();

  return (
    <div ref={ref} onMouseLeave={close}>
      <span className="sr-only">{t("language-switcher")}</span>
      <button
        type="button"
        className="hover:underline"
        onMouseEnter={open}
        aria-expanded={isOpen}
      >
        <span className="sr-only sm:mr-2 sm:inline">
          {languageLinks[locale].name}
        </span>
        <LanguageIcon className="inline-block h-6 w-6" aria-hidden="true" />
      </button>
      <div className="absolute z-50 pt-7 right-[0px]">
      <ul
        className={clsx(
          "w-fit border border-finnishwinter bg-primary-600",
          !isOpen && "hidden",
        )}
      >
        {locales
          .filter((l) => l !== locale)
          .map((l) => {
            const { name, path } = languageLinks[l];
            return (
              <li key={l}>
                <Link
                  className="block p-2 hover:underline"
                  locale={l}
                  href={path}
                >
                  {name.toUpperCase()}
                </Link>
              </li>
            );
          })}
      </ul>
      </div>
    </div>
  );
}

