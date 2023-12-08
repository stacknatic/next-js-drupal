import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { useEffectOnce } from "@/lib/hooks/use-effect-once";
import { useEventListener } from "@/lib/hooks/use-event-listener";
import { useOnClickOutside } from "@/lib/hooks/use-on-click-outside";
import { Menu, MenuItem as MenuItemType } from "@/lib/zod/menu";

import {
  MenuBack,
  MenuContainer,
  MenuContent,
  MenuItem,
  MenuLink,
  MenuList,
  MenuListTitle,
  MenuRoot,
  MenuSubmenu,
  MenuToggle,
  MenuTrigger,
} from "./main-menu.components";
import { isMenuItemActive } from "./main-menu.utils";

interface MainMenuProps {
  menu: Menu;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function MainMenu({ menu, isOpen, setIsOpen }: MainMenuProps) {
  const router = useRouter();

  const [didInit, setDidInit] = useState(false);

  const [activeMenu, _setActiveMenu] = useState<MenuItemType["id"] | null>(
    null,
  );
  const setActiveMenu = (id: MenuItemType["id"] | null) => {
    // Reset submenu when menu changes
    _setActiveMenu(id);
    setActiveSubmenu(null);
  };

  const [activeSubmenu, setActiveSubmenu] = useState<MenuItemType["id"] | null>(
    null,
  );

  // Close when Escape key is pressed
  const close = () => setIsOpen(false);
  useEventListener({
    eventName: "keydown",
    handler: (event) => "key" in event && event.key === "Escape" && close(),
  });

  // Close on click outside
  const ref = useOnClickOutside<HTMLUListElement>(close);

  // Close when route changes
  useEffectOnce(() => {
    router.events.on("routeChangeComplete", close);
    return () => {
      router.events.off("routeChangeComplete", close);
    };
  });

  useEffect(() => {
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    if (!isOpen) {
      // Reset active menu and submenu when menu closes
      setActiveMenu(null);
      setActiveSubmenu(null);
    } else {
      // Set active menu and submenu when menu opens
      const didSetMenuAndSubmenu = menu.some(
        (item) =>
          item.items?.some(
            (subItem) =>
              subItem.items?.some((subSubItem) => {
                if (isMenuItemActive(router, subSubItem.url)) {
                  setActiveMenu(item.id);
                  setActiveSubmenu(subItem.id);
                  return true;
                }
              }),
          ),
      );

      // Active menu and submenu found, done
      if (didSetMenuAndSubmenu) {
        setDidInit(true);
        return;
      }

      // User is not on a page matching a submenu item, so try to find a matching top-level menu item
      menu.some(
        (item) =>
          item.items?.some((subItem) => {
            if (isMenuItemActive(router, subItem.url)) {
              setActiveMenu(item.id);
              setActiveSubmenu(null);
              return true;
            }
          }),
      );

      setDidInit(true);
    }
  }, [isOpen, menu, router]);

  const activeMenuTitle = menu.find((i) => i.id === activeMenu)?.title;
  const activeSubmenuTitle = menu
    .find((i) => i.id === activeMenu)
    ?.items?.find((i) => i.id === activeSubmenu)?.title;

  return (
    <MenuContainer isOpen={isOpen && didInit}>
      <MenuRoot
        value={activeMenu}
        onValueChange={setActiveMenu}
        isOpen={isOpen}
        ref={ref}
        className="hidden lg:flex lg:justify-end lg:items-center lg:w-full"
      >
        <MenuList level={0} className="flex items-center">
          {menu.map((item) => (
            <MenuItem key={item.id} value={item.id} isTopLevel>
              <MenuLink href={item.url} isTopLevel className="px-4 py-2">
                {item.title}
              </MenuLink>
              {item.items?.length > 0 && (
                <MenuTrigger isTopLevel parent={item.title} />
              )}
              <MenuContent className="hidden absolute mt-2 space-y-2 bg-white border border-gray-200 shadow-lg">
                <div className="px-4 py-2">
                  <MenuSubmenu
                    value={activeSubmenu}
                    onValueChange={setActiveSubmenu}
                    className="text-gray-700"
                  >
                    <MenuList level={1} className="flex space-x-4">
                      {item.items?.map((subItem) => (
                        <MenuItem key={subItem.id} value={subItem.id}>
                          <MenuLink href={subItem.url} className="block py-2">
                            {subItem.title}
                          </MenuLink>
                          {subItem.items?.length > 0 && (
                            <MenuTrigger parent={subItem.title} />
                          )}
                          <MenuContent className="hidden absolute mt-0 ml-12 space-y-2 bg-white border border-gray-200 shadow-lg">
                            <MenuSubmenu>
                              <MenuList level={2} className="flex space-x-4">
                                {subItem.items?.map((subSubItem) => (
                                  <MenuItem
                                    key={subSubItem.id}
                                    value={subSubItem.id}
                                  >
                                    <MenuLink
                                      href={subSubItem.url}
                                      className="block py-2"
                                    >
                                      {subSubItem.title}
                                    </MenuLink>
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </MenuSubmenu>
                          </MenuContent>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </MenuSubmenu>
                </div>
              </MenuContent>
            </MenuItem>
          ))}
        </MenuList>
      </MenuRoot>
    </MenuContainer>
  );
}

export { MenuToggle };
