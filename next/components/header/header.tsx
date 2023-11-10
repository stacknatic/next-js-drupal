import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useState } from "react";

import { MainMenu, MenuToggle } from "@/components/main-menu/main-menu";
import { Menu } from "@/lib/zod/menu";
import SearchIcon from "@/styles/icons/search.svg";
import WunderIcon from "@/styles/icons/wunder.svg";

import { LanguageSwitcher } from "./language-switcher";
import { UserMenu } from "./user-menu";

interface HeaderProps {
  menu: Menu;
}

export function Header({ menu }: HeaderProps) {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  // ADDED contact us form in the header section
  const [textArea, setTextArea] = useState("");

  const handleTextChange = (event) => {
    setTextArea(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can handle form submission here, e.g., send the 'text' state to a server
    console.log("Submitted text:", textArea);
  };

  return (
    <header className="z-50 flex-shrink-0 border-b border-finnishwinter bg-white text-primary-600 md:sticky md:top-0">
      <nav className="mx-auto flex max-w-6xl flex-row items-center justify-between px-6 py-4">
        <HomeLink />
        <div className="flex flex-row items-center justify-end gap-6 sm:gap-8">
          <SearchLink />
          <UserMenu />
          <LanguageSwitcher />
          <MenuToggle isOpen={isMainMenuOpen} setIsOpen={setIsMainMenuOpen} />
          <span style={{ position: "relative", left: "3em" }}>Contact us</span>
          <form onSubmit={handleSubmit} style={{ display: "contents" }}>
            <label htmlFor="text"></label>
            <textarea
              id="text"
              name="text"
              value={textArea}
              onChange={handleTextChange}
              placeholder="Enter text here"
              style={{
                backgroundColor: "#5B37BF",
                color: "white",
                borderRadius: "0.5em",
                padding: "0.5em",
              }}
            ></textarea>
            <button
              type="submit"
              style={{
                backgroundColor: "#5B37BF",
                color: "white",
                padding: "0.5em",
                borderRadius: "0.5em",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </nav>
      <MainMenu
        menu={menu}
        isOpen={isMainMenuOpen}
        setIsOpen={setIsMainMenuOpen}
      />
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
      <span className="sr-only sm:not-sr-only sm:mr-2 sm:inline">
        {t("search")}
      </span>
      <SearchIcon className="inline-block h-6 w-6" aria-hidden="true" />
    </Link>
  );
}
