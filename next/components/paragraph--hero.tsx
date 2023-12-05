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
  const translateXRight = scrollPosition; // Calculate the translation for moving right

  return (
    <section id="hero" className="flex bg-primary-600 mb-6 mt-[-2rem] mx-[-11rem] lg:min-h-[93vh]">
      <div className="mx-auto flex relative min-w-screen">
        <div style={{ transform: `translateX(${translateXLeft}px)` }} className="ml-36 mt-36 px-8 py-8 lg:col-span-6 lg:py-16 ">
          {paragraph.field_heading && (
            <h1 className="leading-none mb-4 max-w-2xl text-left text-heading-md font-bold tracking-tight text-primary-600 md:text-heading-lg">
              {paragraph.field_heading}
            </h1>
          )}
          <FormattedText
            html={paragraph.field_formatted_text.processed}
            className={clsx(
              "mb-6 max-w-2xl text-left text-md/xl text-mischka sm:text-lg md:text-lg lg:mb-8 lg:text-xl",
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
        <div style={{ transform: `translateX(${translateXRight}px)` }} className="mt-48 translate-x-11">
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
