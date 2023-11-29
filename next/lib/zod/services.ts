import { z } from "zod";

export const ServiceSchema = z.object({
  type: z.literal("node--service"),
  id: z.string(),
  path: z.object({ alias: z.string() }),
  field_service_name: z.string(),
  field_service_statement: z.string(),
  field_service_description: z.string(),
  field_service_list: z.array(z.string()),
  field_service_category: z.object({
    type: z.literal("node--service_category"),
    id: z.string(),
    field_category_name: z.string(),
  }),
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

export type ServiceDataType = z.infer<typeof ServiceSchema>;

// function to takes array of service and return only validated and cleaned up services

export function validateCleanupServiceData(services: any): ServiceDataType[] {
  const validData = services.reduce((acc: ServiceDataType[], service: any) => {
    const valid = ServiceSchema.safeParse(service);
    if (valid.success) {
      return [...acc, valid.data];
    } else {
      return acc;
    }
  }, []);

  return validData;
}
