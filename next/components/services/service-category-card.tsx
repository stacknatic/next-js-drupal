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
      className="grid md:grid-cols-2"
    >
      <Image
        src={absoluteUrl(category.field_category_image.uri.url)}
        width={384}
        height={240}
        alt={category.field_category_image.resourceIdObjMeta.alt}
        className="md:order-2 w-full object-cover rounded-md"
      />
      <div>
        <h2>{category.field_category_name}</h2>
        <p>{category.field_category_description}</p>
        <ul>
          {serviecsOfThisCategory.map((service) => (
            <li key={service.id}>
              <Link href={service.path.alias}>
                {service.field_service_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
