import Link from "next/link";
import { useTranslation } from "next-i18next";
import clsx from "clsx";

import { CaseTeaser } from "@/components/cases/case-teaser";
// import { ArticleTeaser as ArticleTeaserType } from "@/lib/zod/article-teaser";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { buttonVariants } from "@/ui/button";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { Navigation, Pagination, Autoplay} from "swiper/modules";


// interface LatestCasesProps {
//   cases?: ArticleTeaserType[];
//   heading: string;
// }

export function CaseTeasers({ cases, heading }: any) {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="text-heading-sm font-bold md:text-heading-md">
        {heading}
      </h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        // pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={0}
        slidesPerView={3}
      >
        {cases?.map((case, index) => (
          <SwiperSlide key={index}>
            <CaseTeaser case={case} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex items-center justify-start mx-10 mb-24">
        {!cases?.length && <p className="py-4">{t("no-content-found")}</p>}
        {cases?.length && (
          <Link
            href="/cases"
            className={clsx(
              buttonVariants({ variant: "primary" }),
              "text-base mr-4 mt-4 inline-flex px-5 py-3",
            )}
          >
            {t("All-cases")}
            <ArrowIcon aria-hidden className="ml-3 h-6 w-6 -rotate-90" />
          </Link>
        )}
      </div>
    </>
  );
}
