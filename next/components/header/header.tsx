import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

import { MainMenu, MenuToggle } from "@/components/main-menu/main-menu";
import { Menu } from "@/lib/zod/menu";
import SearchIcon from "@/styles/icons/search.svg";
import PencilIcon from "@/styles/icons/pencil.svg";
import WunderIcon from "@/styles/icons/wunder.svg";

import { LanguageSwitcher } from "./language-switcher";
import { UserMenu } from "./user-menu";

interface HeaderProps {
  menu: Menu;
}

export function Header({ menu }: HeaderProps) {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const scrollDirection = useScrollDirection();
  console.log(scrollDirection); // Add this line to debug the scrollDirection state

  return (
    <header className={`z-50 flex-shrink-0 border-finnishwinter bg-primary-600 text-white h-20 md:sticky ${ scrollDirection === "down" ? "md:-top-20" : "md:top-0"} transition-all duration-500`}>
      <nav className="mx-auto flex max-w-full flex-row items-center justify-between lg:px-10 px-4 py-4">
        <HomeLink />
        <div className="flex flex-row items-center justify-end gap-6 sm:gap-8">
          <MainMenu
            menu={menu}
            isOpen={isMainMenuOpen}
            setIsOpen={setIsMainMenuOpen}
          />
          <ContactLink />
          <SearchLink />
          <UserMenu />
          <LanguageSwitcher />
          <div className="flex lg:hidden">
            {/* Hamburger Menu for smaller screens */}
            <MenuToggle isOpen={isMainMenuOpen} setIsOpen={setIsMainMenuOpen} />
          </div>
        </div>
      </nav>

    </header>
  );
}

function HomeLink() {
  const { locale } = useRouter();
  const { t } = useTranslation();
  return (
    <Link href="/" locale={locale} className="inline">
      <WunderIcon className="w-32" />
      <span className="sr-only">{t("homepage-link")}</span>
    </Link>
  );
}

function SearchLink() {
  const { locale } = useRouter();
  const { t } = useTranslation();
  return (
    <Link href="/search" locale={locale} className="hover:underline">
      {/* <span className="sr-only sm:not-sr-only sm:mr-2 sm:inline">
        {t("search")}
      </span> */}
      <SearchIcon className="inline-block h-6 w-6" aria-hidden="true" />
    </Link>
  );
}

function ContactLink() {
  const { locale } = useRouter();
  const { t } = useTranslation();
  return (
    <Link href="/contacts" locale={locale} className="hover:underline">
      {/* <span className="sr-only sm:not-sr-only sm:mr-2 sm:inline">
        {t("Contact Us")}
      </span> */}
      <PencilIcon className="inline-block h-6 w-6" aria-hidden="true" />
    </Link>
  );
}

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    }
  }, [scrollDirection]);

  return scrollDirection;
};
