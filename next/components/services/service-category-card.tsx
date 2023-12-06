import React from "react";
import { ServiceCategoryType } from "@/lib/zod/service-categories";
import { ServiceDataType } from "@/lib/zod/services";
import Image from "next/image";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import Link from "next/link";

type ServicesCategoryCardPropType = {
  category: ServiceCategoryType;
  services: ServiceDataType[];
};

export default function ServiceCategoryCard({
  category,
  services,
}: ServicesCategoryCardPropType) {
  // filtering only services belongs to this category
  const serviecsOfThisCategory = services.filter(
    (service) =>
      service.field_service_category.field_category_name ===
      category.field_category_name,
  );

  return (
    <div
      id={category.field_category_name.replaceAll(" ", "")}
      className="grid md:grid-cols-2 gap-6 bg-primary-400 hover:bg-primary-600 rounded-xl p-4"
    >
      <Image
        src={absoluteUrl(category.field_category_image.uri.url)}
        width="0"
        height="0"
        priority={true}
        sizes="100vw"
        alt={category.field_category_image.resourceIdObjMeta.alt}
        className="md:order-2 w-full  h-auto object-cover rounded-md"
      />
      <div className="flex flex-col gap-6">
        <div className="bg-primary-50 p-4 rounded-xl shadow-md">
          <h2 className="text-[2rem]">{category.field_category_name}</h2>
          <p className="py-6">{category.field_category_description}</p>
        </div>
        <ul className="bg-primary-50 p-4 rounded-xl shadow-md">
          {serviecsOfThisCategory.map((service) => (
            <li key={service.id}>
              <Link
                className="text-[1.5rem] text-primary-600 pb-1 border-b hover:text-info"
                href={service.path.alias}
                target="_blanck"
              >
                {service.field_service_name}
              </Link>
              <p className="py-6">{service.field_service_short_description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
