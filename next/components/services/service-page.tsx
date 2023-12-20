import { ServiceCategoryType } from "@/lib/zod/service-categories";
import { ServiceDataType } from "@/lib/zod/services";
import React from "react";
import ServiceCategoryCard from "./service-category-card";
import Link from "next/link";
import { ServiceLandingPageType } from "@/lib/zod/service-landing-page";
import ServiceStrategyCard from "./service-strategy-card";
import { Breadcrumbs } from "../breadcrumbs";
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
    <div>
      <Breadcrumbs
        items={[
          {
            title: "services",
            url: "/services",
          },
        ]}
      />
      <h1 className="text-heading-lg md:text-heading-xl text-primary-800 font-bold text-center md:text-left py-8 md:py-16">
        {serviceLandingPage.field_page_title}
      </h1>
      <p className="uppercase text-xl tracking-widest text-center md:text-left md:px-16">
        {serviceLandingPage.field_service_page_statement}
      </p>

      <h2 className="text-primary-500 text-center md:text-left  py-16 text-[2rem] md:px-16">
        {
          serviceLandingPage.field_wunder_working_strategy
            .field_strategy_group_heading
        }
      </h2>

      <div className="md:mx-16 grid grid-cols-1 md:grid-cols-2 gap-6 bg-primary-400 hover:bg-primary-600 rounded-xl p-4">
        {serviceLandingPage.field_wunder_working_strategy.field_strategies.map(
          (item) => (
            <ServiceStrategyCard key={item.id} strategy={item} />
          ),
        )}
      </div>
      <div className="md:px-16 flex gap-4 text-md md:text-lg py-16">
        <p className="uppercase tracking-widest">Jump to:</p>
        <ul className="flex gap-4">
          {serviceCategories.map((cat) => (
            <li key={cat.id}>
              <Link
                className="text-[#5651e5] border-b border-primary-300"
                href={`/services#${cat.field_category_name.replaceAll(
                  " ",
                  "",
                )}`}
              >
                {cat.field_category_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:px-16 grid gap-16 justify-center">
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
