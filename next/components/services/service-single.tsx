import React from "react";
import { ServiceDataType } from "@/lib/zod/services";
import Image from "next/image";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { ServiceCategoryType } from "@/lib/zod/service-categories";
import ServiceCategoryNavbar from "./service-category-navbar";
import { Breadcrumbs } from "../breadcrumbs";

type ServicePageProps = {
  service: ServiceDataType;
  services: ServiceDataType[];
  serviceCategories: ServiceCategoryType[];
  // languageLinks: LanguageLinks;
};

export default function ServiceSingle({
  service,
  services,
  serviceCategories,
}: ServicePageProps) {
  return (
    <div className="px-16">
      <Breadcrumbs
        items={[
          {
            title: "services",
            url: "/services",
          },
          {
            title: service.field_service_name,
          },
        ]}
      />
      <h1 className="text-[3rem] text-center md:text-left  py-16">
        {service.field_service_name}
      </h1>
      <div className="grid md:grid-cols-2 gap-6  p-4 rounded-xl">
        <div className="flex flex-col gap-8 rounded-xl p-4">
          <p className="uppercase text-xl font-light tracking-widest text-center md:text-left">
            {service.field_service_statement}
          </p>
          <ul className="flex flex-col gap-1">
            {service.field_service_list.map((item, index) => (
              <li
                className="bg-white px-4 py-4 border-s-[1rem]  border-primary-200 rounded-e-[2rem] rounded-s-lg shadow-m"
                key={index + item}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <Image
          src={absoluteUrl(service.field_service_image.uri.url)}
          width={384}
          height={240}
          alt={service.field_service_image.resourceIdObjMeta.alt}
          className="w-full object-cover rounded-md"
        />
        <p className="order-3 md:col-span-2 p-4 rounded-xl">
          {service.field_service_description}
        </p>
      </div>
      <div className="mt-16  p-4 rounded-xl ">
        <div className="grid gap-16 justify-center">
          <ServiceCategoryNavbar
            services={services}
            categories={serviceCategories}
          />
        </div>
      </div>
    </div>
  );
}
