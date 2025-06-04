"use client";

import { CalendarDisplay } from "@/modules/company/citas/calendar-display";
import { authClient } from "@meetzen/auth/client";
import Link from "next/link";
import { cn } from "@meetzen/ui/src/lib/utils";
import { buttonVariants } from "@meetzen/ui/src/components/button";

export default function CitasPage() {
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
    <div className="pb-4">
      <CalendarDisplay />
    </div>
  );
}
