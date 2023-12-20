import { ServiceCategoryType } from "@/lib/zod/service-categories";
import { ServiceDataType } from "@/lib/zod/services";
import Link from "next/link";
import React from "react";

type ServiceCategoryNavbarPropsType = {
  services: ServiceDataType[];
  categories: ServiceCategoryType[];
};

export default function ServiceCategoryNavbar({
  services,
  categories,
}: ServiceCategoryNavbarPropsType) {
  return (
    <div className="grid md:grid-cols-3 gap-8 md:gap-4">
      {categories.map((category) => {
        const serviceOfThisCategory = services.filter(
          (service) =>
            service.field_service_category.field_category_name ===
            category.field_category_name,
        );
        return (
          <div key={category.id} className="flex flex-col gap-4 px-4">
            <h2>
              <Link
                className="uppercase tracking-widest text-lg text-primary-600 hover:pb-1 hover:border-b hover:text-info"
                href={`/services#${category.field_category_name.replaceAll(
                  " ",
                  "",
                )}`}
              >
                {category.field_category_name}
              </Link>
            </h2>
            <p>{category.field_category_description}</p>
            <ul className="flex flex-col gap-2 items-start text-primary-400 text-lg ">
              {serviceOfThisCategory.map((service) => (
                <li key={service.id}>
                  <Link
                    className="text-primary-600 hover:pb-1 hover:border-b hover:text-info"
                    href={service.path.alias}
                  >
                    {service.field_service_name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
