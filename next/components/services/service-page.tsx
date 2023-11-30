import { ServiceCategoryType } from "@/lib/zod/service-categories";
import { ServiceDataType } from "@/lib/zod/services";
import React from "react";
import ServiceCategoryCard from "./service-category-card";
import Link from "next/link";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { ServiceLandingPageType } from "@/lib/zod/service-landing-page";
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
      <h1 className="text-[4rem] text-center md:text-left  py-16">Services</h1>
      <p className="uppercase text-xl font-light tracking-widest text-center md:text-left">
        Where customer experience, business and digital come together.
      </p>

      <h2 className="text-primary-500 text-center md:text-left  py-16 text-[2rem]">
        The Wunder Way
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-primary-400 hover:bg-primary-600 rounded-xl p-4">
        <div className="bg-primary-50 p-6 rounded-xl shadow-xl flex flex-col justify-center">
          <h3 className="text-center text-lg pb-3 mb-3 border-b uppercase tracking-widest">
            A walk togather
          </h3>
          <p>
            Our international team of experts helps your organisation find
            solutions that ensure you reach your goals.
          </p>
        </div>
        <div className="bg-primary-50 p-6 rounded-xl shadow-xl flex flex-col justify-center">
          <h3 className="text-center text-lg pb-3 mb-3 border-b uppercase tracking-widest">
            A strategic mindset
          </h3>
          <p>
            We are constantly thinking about the big picture and of ways to help
            you continuously improve your business for maximal value. We are
            driven by curiosity and are eager to find ever better solutions.
          </p>
        </div>

        <div className="bg-primary-50 p-6 rounded-xl shadow-xl flex flex-col justify-center">
          <h3 className="text-center text-lg pb-3 mb-3 border-b uppercase tracking-widest">
            Customer centricity
          </h3>
          <p>
            An excellent user experience means the world to us, but your
            business value matters the most.
          </p>
        </div>
        <div className="bg-primary-50 p-6 rounded-xl shadow-xl flex flex-col justify-center">
          <h3 className="text-center text-lg pb-3 mb-3 border-b uppercase tracking-widest">
            Openness and honesty
          </h3>
          <p>
            We keep the projects flowing and place extra emphasis on good and
            continuous communication.
          </p>
        </div>
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
