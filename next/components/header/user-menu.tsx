import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import clsx from "clsx";

import { useOnClickOutside } from "@/lib/hooks/use-on-click-outside";
import AccountIcon from "@/styles/icons/account-circle.svg";

export function UserMenu() {
  const { locale, asPath, query } = useRouter();
  const { t } = useTranslation();
  const { data, status } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const loginUrl = `/auth/login?callbackUrl=${encodeURIComponent(
    query.callbackUrl?.toString() || `/${locale}${asPath}`,
  )}`;

  const ref = useOnClickOutside<HTMLDivElement>(close);

  if (status === "authenticated") {
    return (
      <div ref={ref} onMouseLeave={close}>
        <span className="sr-only">{t("user-menu")}</span>
        <button
          type="button"
          className="hover:underline"
          onMouseEnter={open}
          aria-expanded={isOpen}
        >
          <span className="sr-only capitalize sm:not-sr-only sm:mr-2 sm:inline">
            {data.user.name}
          </span>
          <AccountIcon className="inline-block h-6 w-6" />
        </button>
        <div className="absolute z-50 pt-1 ">
        <ul
          className={clsx(
            "w-fit border border-finnishwinter bg-mischka",
            !isOpen && "hidden",
          )}
        >
          <li>
            <Link
              className="block p-2 hover:underline"
              href="/dashboard"
              onClick={close}
            >
              {t("user-dashboard").toUpperCase()}
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="block w-full p-2 text-left hover:underline"
              onClick={() => void signOut()}
            >
              {t("log-out").toUpperCase()}
            </button>
          </li>
        </ul>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} onMouseLeave={close}>
      <span className="sr-only">{t("user-menu")}</span>
      <button type="button" className="hover:underline" onMouseEnter={open} >
        <span className="sr-only capitalize sm:mr-2 sm:inline">
          {t("account")}
        </span>
        <AccountIcon className="inline-block h-6 w-6" />
      </button>
      <div className="absolute z-50 pt-7">
      <ul
        className={clsx(
          " w-fit border border-finnishwinter bg-primary-600",
          !isOpen && "hidden",
        )}
      >
        <li>
          <Link
            className="block p-2 hover:underline"
            href={loginUrl}
            onClick={close}
          >
            {t("log-in").toUpperCase()}
          </Link>
        </li>
        <li>
          <Link
            className="block p-2 hover:underline"
            href="/auth/register"
            onClick={close}
          >
            {t("register").toUpperCase()}
          </Link>
        </li>
      </ul>
      </div>
    </div>
  );
}
