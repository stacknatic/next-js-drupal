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
    <>
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
      <h1 className="text-heading-lg md:text-heading-xl text-primary-800 font-bold text-center md:text-left py-8 md:py-16">
        {service.field_service_name}
      </h1>
      
      <div className="grid md:grid-cols-2 gap-6 md:px-16 rounded-xl">
        <div className="flex flex-col gap-8 rounded-xl py-4">
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
          width="0"
          height="0"
          priority={true}
          sizes="100vw"
          alt={service.field_service_image.resourceIdObjMeta.alt}
          className="w-full h-auto object-cover rounded-md"
        />
        <p className="order-3 md:col-span-2 md:px-16 rounded-xl">
          {service.field_service_description}
        </p>
      </div>
      <div className="mt-16  p-16 rounded-xl ">
        <div className="grid gap-16 justify-center">
          <ServiceCategoryNavbar
            services={services}
            categories={serviceCategories}
          />
        </div>
      </div>
    </>
  );
}
