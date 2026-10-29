"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CostEstimator } from "@/components/home/CostEstimator";
import { ServiceType, CALCULATOR_SERVICES } from "@/config/calculator.config";

export function QuotationFunnel() {
  const searchParams = useSearchParams();
  const [initialService, setInitialService] = useState<ServiceType | undefined>(undefined);

  useEffect(() => {
    const s = searchParams.get("service");
    if (s && CALCULATOR_SERVICES.some((x) => x.id === s)) {
      setInitialService(s as ServiceType);
    }
  }, [searchParams]);

  return (
    <div className="w-full">
      <CostEstimator initialService={initialService} />
    </div>
  );
}
