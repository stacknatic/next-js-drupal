import React from "react";
import { ServiceStrategyType } from "../../lib/zod/service-landing-page";

export default function ServiceStrategyCard({
  strategy,
}: {
  strategy: ServiceStrategyType;
}) {
  return (
    <div className="bg-primary-50 p-6 rounded-xl shadow-xl flex flex-col justify-center">
      <h3 className="text-center text-lg pb-3 mb-3 border-b uppercase tracking-widest">
        {strategy.field_heading_desc_heading}
      </h3>
      <p>{strategy.field_heading_desc_description}</p>
    </div>
  );
}
