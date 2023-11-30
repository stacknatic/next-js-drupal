import { z } from "zod";

export const ServiceStrategySchema = z.object({
  id: z.string(),
  field_heading_desc_heading: z.string(),
  field_heading_desc_description: z.string(),
});

export const ServiceLandingPageSchema = z.object({
  id: z.string(),
  field_page_title: z.string(),
  field_service_page_statement: z.string(),
  field_wunder_working_strategy: z.object({
    field_strategy_group_heading: z.string(),
    field_strategies: z.array(ServiceStrategySchema),
  }),
});

export type ServiceStrategyType = z.infer<typeof ServiceStrategySchema>;
export type ServiceLandingPageType = z.infer<typeof ServiceLandingPageSchema>;

export function validateCleanupServiceLandingPage(
  landingPage: any,
): ServiceLandingPageType {
  return ServiceLandingPageSchema.parse(landingPage);
}
