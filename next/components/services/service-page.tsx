import { ServiceCategoryType } from "@/lib/zod/service-categories";
import { ServiceDataType } from "@/lib/zod/services";
import React from "react";
import ServiceCategoryCard from "./service-category-card";
import Link from "next/link";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { ServiceLandingPageType } from "@/lib/zod/service-landing-page";
import ServiceStrategyCard from "./service-strategy-card";
type ServicesPropType = {
  services: ServiceDataType[];
  serviceCategories: ServiceCategoryType[];
  serviceLandingPage: ServiceLandingPageType;
};

export default function ServicePage({
  services,
  serviceCategories,
  serviceLandingPage,
}: ServicesPropType) {
  return (
    <div className="px-16">
      <h1 className="text-[4rem] text-center md:text-left  py-16">
        {serviceLandingPage.field_page_title}
      </h1>
      <p className="uppercase text-xl font-light tracking-widest text-center md:text-left">
        {serviceLandingPage.field_service_page_statement}
      </p>

      <h2 className="text-primary-500 text-center md:text-left  py-16 text-[2rem]">
        {
          serviceLandingPage.field_wunder_working_strategy
            .field_strategy_group_heading
        }
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-primary-400 hover:bg-primary-600 rounded-xl p-4">
        {serviceLandingPage.field_wunder_working_strategy.field_strategies.map(
          (item) => (
            <ServiceStrategyCard key={item.id} strategy={item} />
          ),
        )}
      </div>
      <div className="flex gap-4 text-md md:text-lg py-16">
        <p className="uppercase tracking-widest">Jump to:</p>
        <ul className="flex gap-4">
          {serviceCategories.map((cat) => (
            <Link
              className="text-[#5651e5] border-b border-primary-300"
              key={cat.id}
              href={`/services#${cat.field_category_name.replaceAll(" ", "")}`}
            >
              {cat.field_category_name}
            </Link>
          ))}
        </ul>
      </div>
      <div className="grid gap-16 justify-center">
        {serviceCategories.map((category) => (
          <ServiceCategoryCard
            key={category.id}
            category={category}
            services={services}
          />
        ))}
      </div>
    </div>
  );
}
