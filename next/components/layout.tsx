import { useTranslation } from "next-i18next";
import React from "react";
import clsx from "clsx";

import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import {
  PreviewBanner,
  useIsPreviewBannerVisible,
} from "@/components/preview-banner";
import { Menu } from "@/lib/zod/menu";

import { SkipToContentLink } from "@/ui/skip-to-content-link";
import CookieBanner from "./cookieBanner";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

export interface LayoutProps {
  menus: {
    main: Menu;
    footer: Menu;
  };
  children?: React.ReactNode;
}

export function Layout({ menus, children }: LayoutProps) {
  const isPreviewVisible = useIsPreviewBannerVisible();
  const { t } = useTranslation();
  const router = useRouter();
  const isHomePage = router.pathname === "/";
  

  return (
    <>
      <div
        className={clsx(
          "flex min-h-screen flex-col",
          isPreviewVisible && "mt-10",
        )}
      >
        <SkipToContentLink href="#main-content">
          {t("skip-to-main-content")}
        </SkipToContentLink>
        <Header menu={menus.main} />
        <div className="main-content-container">

        <main className="grow border-2 border-primary-500 rounded-lg ml-1" id="main-content">

          <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
        </main>
        {pathname.includes('/articles/') && (
          <aside className="border-2 border-primary-500 rounded-lg">
          </aside>
          )}
           {pathname.includes('/news/') && (
          <aside className="border-2 border-primary-500 rounded-lg">
          </aside>
          )}
          
        </div>
        <Footer menu={menus.footer} />
        <CookieBanner />
      </div>
      <PreviewBanner isVisible={isPreviewVisible} />
    </>
  );
}
