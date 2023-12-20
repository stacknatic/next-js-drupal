import { z } from "zod";
import { MetatagsSchema } from "./metatag";

export const ServiceBaseSchema = z.object({
  type: z.literal("node--service"),
  id: z.string(),
  title: z.string(),
  metatag: MetatagsSchema.optional().nullable(),
  path: z.object({ alias: z.string() }),
  field_service_name: z.string(),
  field_service_short_description: z.string(),
  field_service_category: z.object({
    type: z.literal("node--service_category"),
    id: z.string(),
    field_category_name: z.string(),
  }),
});

export const ServiceSchema = ServiceBaseSchema.extend({
  field_service_statement: z.string(),
  field_service_description: z.string(),
  field_service_list: z.array(z.string()),
  field_service_image: z.object({
    id: z.string(),
    uri: z.object({
      url: z.string(),
    }),
    resourceIdObjMeta: z.object({
      alt: z.string(),
    }),
  }),
});

// exporting type out of schema

export type ServiceBaseType = z.infer<typeof ServiceBaseSchema>;
export type ServiceDataType = z.infer<typeof ServiceSchema>;

// function to takes array of service and return only validated and cleaned up services

export function validateCleanupServiceData(services: any): ServiceBaseType[] {
  const validData = services.reduce((acc: ServiceBaseType[], service: any) => {
    const valid = ServiceBaseSchema.safeParse(service);
    if (valid.success) {
      return [...acc, valid.data];
    } else {
      return acc;
    }
  }, []);

  return validData;
}
