"use client";

import { authClient } from "@meetzen/auth/client";
import Link from "next/link";
import { cn } from "@meetzen/ui/src/lib/utils";
import { buttonVariants } from "@meetzen/ui/src/components/button";

import { ServiciosHeader } from "@/modules/company/servicios/servicios-header";
import { ServiciosTable } from "@/modules/company/servicios/servicios-table";
import { Loader } from "lucide-react";

export default function ServiciosPage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center h-[calc(100vh-5rem)]">
        <Loader className="h-8 w-8 animate-spin text-primary mb-4" />
        <p>Cargando...</p>
      </div>
    );
  }

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
    <div className="space-y-4">
      <ServiciosHeader />
      <ServiciosTable />
    </div>
  );
}
