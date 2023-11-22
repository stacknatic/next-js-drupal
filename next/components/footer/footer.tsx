import Link from "next/link";
import { useRouter } from "next/router";

import { SocialShare } from "@/components/footer/social-share";
import type { Menu, MenuItem, MenuItemOptions } from "@/lib/zod/menu";
import Facebook from "@/styles/icons/facebook.svg";
import LinkedIn from "@/styles/icons/linkedin.svg";
import Twitter from "@/styles/icons/twitter.svg";
import WunderCarrot from "@/styles/icons/wunder-carrot.svg";

interface FooterProps {
  menu: Menu;
}

export function Footer({ menu }: FooterProps) {
  // Only show the menu items that match the current locale:
  const { locale } = useRouter();
  const filteredItems = menu.filter((link) => link.langcode == locale);
  return (
    <footer className="border-t border-finnishwinter">
      <div className="mx-auto max-w-6xl px-6">
        <nav className="flex flex-col items-center gap-2 py-8 text-md sm:flex-row sm:justify-between">
          <ul className="mr-4 flex flex-wrap gap-x-12 gap-y-4">
            {filteredItems.map((link) => {
              const icon = Array.isArray(link.options)
                ? null
                : link.options.attributes.icon;
              return (
                <li key={link.id}>
                  <FooterLink href={link.url} >
                    {link.title}
                  </FooterLink>
                </li>
              );
            })}
          </ul>
          <SocialShare />
          <FooterLink href="https://next-drupal.org" newTab>
            Next.js for Drupal
          </FooterLink>
        </nav>
      </div>
    </footer>
  );
}

interface FooterLinkProps {
  href: MenuItem["url"];
  icon?: MenuItemOptions["attributes"]["icon"] | null;
  newTab?: boolean;
  children: React.ReactNode;
}

function FooterLink({ href, icon, newTab = false, children }: FooterLinkProps) {
  const [target, rel] = newTab ? ["_blank", "noreferrer"] : [];

  const Icon = {
    facebook: Facebook,
    linkedin: LinkedIn,
    twitter: Twitter,
    wunder: WunderCarrot,
  }[icon];

  return (
    <Link href={href} target={target} rel={rel} className="hyperlink">
      {icon && (
        <div className="mr-2 flex h-6 w-6 items-center justify-center">
          <Icon className="h-auto w-full" aria-hidden />
        </div>
      )}
      {children}
    </Link>
  );
}
