"use client";

import { SectionCards } from "@/modules/company/home/section-card";
import { ChartAreaInteractive } from "@/modules/company/home/chart-area-interactive";
import { authClient } from "@meetzen/auth/client";
import Link from "next/link";
import { cn } from "@meetzen/ui/src/lib/utils";
import { buttonVariants } from "@meetzen/ui/src/components/button";

export default function CompanyPage() {
  const { data: session } = authClient.useSession();

  if (!session?.user.companyId) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center h-[calc(100vh-5rem)]">
        <p>Necesitas crear una empresa para continuar</p>
        <Link
          href="/company/configuracion"
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Crear empresa
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4">
          <SectionCards />
          <ChartAreaInteractive />
          <ChartAreaInteractive />
        </div>
      </div>
    </div>
  );
}
