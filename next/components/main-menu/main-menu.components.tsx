import NextLink from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Dispatch, forwardRef, ReactNode, SetStateAction } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import clsx from "clsx";

import { MenuItem as MenuItemType } from "@/lib/zod/menu";
import Chevron from "@/styles/icons/chevron-down.svg";
import CloseIcon from "@/styles/icons/close.svg";
import MenuIcon from "@/styles/icons/menu.svg";

import css from "./main-menu.module.css";
import { disableHoverEvents, isMenuItemActive } from "./main-menu.utils";

export function MenuContainer({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={clsx(
        css.mainMenu,
        "relative mx-auto font-inter lg:flex lg:justify-start lg:items-center lg:mr-10 lg:pt-0",
        !isOpen && "hidden",
      )}
    >
      {children}
    </div>
  );
}

type MenuProps = NavigationMenu.NavigationMenuProps & {
  isOpen: boolean;
};

export const MenuRoot = forwardRef<
  React.ElementRef<typeof NavigationMenu.Root>,
  MenuProps
>(({ isOpen, ...props }, ref) => {
  return (
    <NavigationMenu.Root
      ref={ref}
      {...props}
      className={clsx(
        "absolute inset-0 z-40 overflow-y-auto overflow-x-hidden border-finnishwinter lg:relative lg:flex lg:items-center lg:justify-center lg:border-none",
        isOpen && "border-t bg-white lg:border",
        isOpen &&
          "after:absolute after:left-[calc(66.67%+1px)] after:h-full after:border-r",
      )}
    />
  );
});
MenuRoot.displayName = "MenuRoot";

export function MenuToggle({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<typeof isOpen>>;
}) {
  const { t } = useTranslation();
  const ToggleIcon = isOpen ? CloseIcon : MenuIcon;
  return (
    <button
      onClick={() => setIsOpen((o) => !o)}
      className="hover:underline"
      aria-label={t("toggle-menu")}
      aria-expanded={isOpen ? "true" : "false"}
    >
      <ToggleIcon className="inline h-6 w-6" aria-hidden="true" />
    </button>
  );
}

export function MenuList({ children, level }) {
  return (
    <NavigationMenu.List
    className={clsx(
      "fixed inset-0 top-[72px] overflow-scroll border-b border-l border-r border-white bg-white lg:relative lg:flex lg:items-center lg:justify-center lg:border-none lg:overflow-visible lg:top-0 lg:w-auto",
      level === 0 &&
        "z-10 h-full lg:flex lg:space-x-4 lg:border-none lg:bg-transparent",
      level === 1 &&
        "z-20 lg:absolute lg:flex-col lg:bg-primary-600 lg:border lg:shadow-lg",
      level === 2 && "z-30 "
    )}
    >
      {children}
    </NavigationMenu.List>
  );
}

export function MenuListTitle({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <h2 className="border-b border-finnishwinter p-6 pt-0 text-heading-xs font-bold text-steelgray hover:underline lg:hidden">
      <MenuLink href={href} isTitle={true}>
        {children}
      </MenuLink>
    </h2>
  );
}

export function MenuBack({ onClick }: { onClick: () => void }) {
  const { t } = useTranslation();
  return (
    <button
      className="m-6 inline-flex items-center justify-center pr-2 hover:underline lg:hidden"
      onClick={onClick}
    >
      <Chevron className="h-6 w-6 rotate-90" aria-hidden="true" />
      <span className="pl-4">{t("menu-back")}</span>
    </button>
  );
}

export function MenuItem({
  value,
  isTopLevel,
  children,
}: {
  value: MenuItemType["id"];
  isTopLevel?: boolean;
  children: ReactNode;
}) {
  return (
    <NavigationMenu.Item
    className={clsx(
      "flex border-b border-finnishwinter bg-white font-bold tracking-widest text-primary-600 underline-offset-4 lg:flex lg:items-center lg:border-none lg:bg-transparent lg:text-mischka lg:hover:bg-gray-200 lg:relative lg:m-0 lg:min-w-600",
      isTopLevel && "lg:text-mischka lg:hover:relative lg:m-0"
    )}
      value={value}
    >
      {children}
    </NavigationMenu.Item>
  );
}

export function MenuLink({
  href,
  isTitle,
  isTopLevel,
  children,
}: {
  href: string;
  isTitle?: boolean;
  isTopLevel?: boolean;
  children: ReactNode;
}) {
  const router = useRouter();
  const isActive = isMenuItemActive(router, href);
  return (
    <NavigationMenu.Link
      asChild
      active={isActive}
      className={clsx(
        "block h-full grow p-6 hover:underline data-[active]:underline lg:inline-block lg:p-0 lg:m-2 lg:hover:bg-gray-100 lg:text-xs",
        isTopLevel && "lg:ring-white",
      )}
    >
      <NextLink href={href}>{children}</NextLink>
    </NavigationMenu.Link>
  );
}

export function MenuTrigger({
  isTopLevel,
  parent,
}: {
  isTopLevel?: boolean;
  parent?: string;
}) {
  const { t } = useTranslation();
  return (
    <NavigationMenu.Trigger
      {...disableHoverEvents}
        className={clsx(
    "flex w-20 lg:w-5 shrink-0 items-center justify-center ring-inset ring-primary-700 lg:hover:ring-0 hover:ring-2 lg:inline-flex lg:border-none  lg:group-hover:opacity-100 ",
    isTopLevel
      ? "lg:aria-expanded:bg-white lg:aria-expanded:text-primary-600"
      : "lg:aria-expanded:bg-primary-600 lg:aria-expanded:text-white lg:aria-expanded:ring-primary-600",
  )}
      aria-label={`${t("show-submenu", { parent })}`}
    >
      <Chevron className="h-9 w-9 -rotate-90 lg:h-5 lg:w-5 lg:rotate-0" />
    </NavigationMenu.Trigger>
  );
}
// NAVIGATION MENU NEED TO BE FIXED, IT MUST BE LG:ABSOLUTE, BUT THAT DOESNT WORK
export function MenuContent({ children }) {
  return (
    <NavigationMenu.Content {...disableHoverEvents} className="lg:group-hover:block lg:z-500 lg:bg-white lg:border lg:shadow-lg">
  {children}
</NavigationMenu.Content>
  );
}

export function MenuSubmenu({
  children,
  ...props
}: NavigationMenu.NavigationMenuSubProps) {
  return <NavigationMenu.Sub {...props}>{children}</NavigationMenu.Sub>;
}
