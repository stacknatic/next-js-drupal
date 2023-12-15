import Link from "next/link";
import clsx from "clsx";

import { FormattedText } from "@/components/formatted-text";
import { MediaImage } from "@/components/media--image";
import { Hero as HeroType } from "@/lib/zod/paragraph";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { buttonVariants } from "@/ui/button";
import { useEffect, useState } from "react";


export function ParagraphHero({ paragraph }: { paragraph: HeroType }) {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Add a scroll event listener to update the scroll position
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const translateXLeft = -scrollPosition;
  const translateXRight = scrollPosition;

  return (
    <section id="hero" className="flex sm:min-w-screen mb-2 sm:mb-6 sm:mt-0 sm:mx-auto sm:max-w-screen overflow-x-hidden sm:min-h-[80vh] lg:min-h-[81vh] lg:mx-[-168px] mx-[-24px]">
      <div className="mx-auto lg:flex relative sm:min-w-screen overflow-x-hidden">
        <div style={{ transform: `translateX(${translateXLeft}px)` }} className="mx-10 my-10 min-h-0 lg:max-h-0 lg:ml-36 lg:mt-36 lg:px-8 lg:py-8 lg:col-span-6 lg:py-16 z-10">
          {paragraph.field_heading && (
            <h1 className="leading-none mb-4 max-w-2xl text-left text-heading-md font-bold tracking-tight text-primary-600 md:text-heading-lg">
              {paragraph.field_heading}
            </h1>
          )}
          <FormattedText
            html={paragraph.field_formatted_text.processed}
            className={clsx(
              "mb-6 max-w-6xl text-left text-primary-600 text-heading-lg",
              paragraph.field_heading && "mt-4",
            )}
          />
          <div className="gap-4 text-left">
            {paragraph.field_primary_link && (
              <Link
                href={paragraph.field_primary_link.full_url}
                className={clsx(
                  buttonVariants({ variant: "secondary" }),
                  "text-base mr-4 inline-flex px-5 py-3 rounded-full",
                )}
              >
                {paragraph.field_primary_link.title}
                <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
              </Link>
            )}

            {/* {paragraph.field_secondary_link && (
              <Link
                href={paragraph.field_secondary_link.full_url}
                className={clsx(
                  buttonVariants({ variant: "secondary" }),
                  "text-base mt-3 inline-flex px-5 py-3 sm:mt-0",
                )}
              >
                {paragraph.field_secondary_link.title}
                <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
              </Link>
            )} */}
          </div>
        </div>
        <div style={{ transform: `translateX(${translateXRight}px)` }} className="mb-10 lg:max-h-0 min-h-0 lg:mt-56 translate-x-11 z-10">
          <MediaImage
            media={paragraph.field_image}
            alt="site-banner"
            priority
          />
        </div>
      </div>
    </section>
  );
}
